<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\GameRepository;
use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
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
    private CategoryRepository $categoryRepository;
    private QuestionRepository $questionRepository;
    
    function __construct(
        Security $security, 
        SerializeManager $serializeManager,
        GameRepository $gameRepository,
        CategoryRepository $categoryRepository,
        QuestionRepository $questionRepository,
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->gameRepository = $gameRepository;
        $this->categoryRepository = $categoryRepository;
        $this->questionRepository = $questionRepository;
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

    #[Route("/game", name: "post_game", methods: ["POST"])]
    public function post_user_game(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $fields = [
                "category" => "",
                "user" => $this->user,
            ];
        } catch(\Exception $e) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }

    #[Route("/game/{gameID}", name: "get_game", requirements: ['gameID' => "\d+"], methods: ["GET"])]
    public function get_game(int $gameID) : JsonResponse {
        $game = $this->gameRepository->find($gameID);
        if(!$game) {
            return $this->json([
                "data" => [
                    "code" => Response::HTTP_NOT_FOUND,
                    "message" => "Game not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "results" => $this->serializeManager->serializeContent($game)
        ], Response::HTTP_OK);
    }

    #[Route("/game/questions", name: "get_game_questions", methods: ["GET"])]
    public function get_game_questions(Request $request) : JsonResponse {
        $category = $request->get("category", "");
        $nbrQuestions = $request->get("nbr_questions");
        $nbrQuestions = is_numeric($nbrQuestions) ? $nbrQuestions : 10;

        // Temporary => For test purpose
        $category = "science";

        $question = $this->questionRepository->getQuestionsForGame($category, $nbrQuestions);

        return $this->json([
            "results" => $this->serializeManager->serializeContent($question)
        ]);
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
