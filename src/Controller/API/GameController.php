<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Enum\GameEnum;
use App\Enum\StatusEnum;
use App\Manager\GameManager;
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
    private GameManager $gameManager;
    private SerializeManager $serializeManager;
    private GameRepository $gameRepository;
    private CategoryRepository $categoryRepository;
    private QuestionRepository $questionRepository;
    
    function __construct(
        Security $security, 
        GameManager $gameManager,
        SerializeManager $serializeManager,
        GameRepository $gameRepository,
        CategoryRepository $categoryRepository,
        QuestionRepository $questionRepository,
    ) {
        $this->user = $security->getUser();
        $this->gameManager = $gameManager;
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
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $jsonContent[GameEnum::GAME_STATUS] = StatusEnum::STATUS_TERMINATED;
            $fields = $this->gameManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $game = $this->gameManager->fillGame($fields, $this->user);
            if(is_string($game)) {
                throw new \Exception($game, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            foreach($fields[GameEnum::GAME_DETAILS] as $gameDetail) {
                if(is_string($this->gameManager->fillGameDetail($gameDetail, $game))) {
                    continue;
                }
            }
        } catch(\Exception $e) {
            return $this->json([
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
                "message" => "Game not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "results" => [
                "goodAnswers" => 0,
                "badAnswers" => 0,
                "game" => $this->serializeManager->serializeContent($game)
            ]
        ], Response::HTTP_OK);
    }

    #[Route("/game/questions", name: "get_game_questions", methods: ["GET"])]
    public function get_game_questions(Request $request) : JsonResponse {
        $mode = $request->get("mode", "standard");
        $category = $request->get("category", "");
        $nbrQuestions = $request->get("nbr_questions");
        $nbrQuestions = is_numeric($nbrQuestions) ? $nbrQuestions : 10;

        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->questionRepository->getQuestionsForGame($category, $nbrQuestions)
            )
        ]);
    }

    #[Route("/game/standard", name: "post_game_standard", methods: ["POST"])]
    public function post_game_standard(Request $request) : JsonResponse {
        return $this->json([
            "results" => [
                "message" => "Route under construction"
            ]
        // ], Response::HTTP_CREATED);
        ], Response::HTTP_OK);
    }

    #[Route("/game/challenge", name: "get_game_challenge", methods: ["GET"])]
    public function get_game_challenge(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->questionRepository->findBy([], ["id" => "DESC"], 1)
            )
        ]);
    }

    #[Route("/game/challenge", name: "post_game_challenge", methods: ["POST"])]
    public function post_game_challenge(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "Has error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            // 
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "results" => [
                "message" => "Route under construction"
            ]
        // ], Response::HTTP_CREATED);
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
            "results" => $this->serializeManager->serializeContent(
                $this->gameRepository->findBy($filterParameters, ["created_at" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }
}
