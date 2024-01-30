<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\GameRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class GameController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private GameRepository $gameRepository;
    
    function __construct(
        Security $security, 
        SerializeManager $serializeManager,
        GameRepository $gameRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->gameRepository = $gameRepository;
    }

    #[Route('/games', name: 'get_games', methods: ["GET"])]
    public function get_games(Request $request): JsonResponse {
        $limit = 30;
        $offset = is_int($request->get("offset")) && $request->get("offset") > 1 ? $request->get("offset") : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->gameRepository->countGames() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->gameRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route("/game/{gameID}", name: "get_game", methods: ["GET"])]
    public function get_game(int $gameID) : JsonResponse {
        $game = $this->gameRepository->find($gameID);
        if(!$game) {
            return $this->json([
                "data" => [
                    "message" => "Game not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "data" => $this->serializeManager->serializeContent($game)
        ], Response::HTTP_OK);
    }

    #[Route("/game/latest", name: "get_latest_game", methods: ["GET"])]
    public function get_latest_game(Request $request) : JsonResponse {
        $limit = 30;
        $offset = is_int($request->get("offset")) ? intval($request->get("offset")) : 1;

        $filterParameters = [];
        if(!$this->user->isAdmn()) {
            $filterParameters = ["user" => $this->user];
        }
        
        return $this->json([
            "data" => $this->serializeManager->serializeContent(
                $this->gameRepository->findBy($filterParameters, ["created_at" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }
}
