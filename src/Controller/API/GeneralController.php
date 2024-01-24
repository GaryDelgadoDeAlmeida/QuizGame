<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\GameRepository;
use App\Repository\UserRepository;
use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/general', name: 'api_general_')]
class GeneralController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;
    private GameRepository $gameRepository;
    private CategoryRepository $categoryRepository;
    private QuestionRepository $questionRepository;

    function __construct(
        Security $security, 
        SerializeManager $serializeManager, 
        UserRepository $userRepository, 
        GameRepository $gameRepository,
        CategoryRepository $categoryRepository,
        QuestionRepository $questionRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
        $this->gameRepository = $gameRepository;
        $this->categoryRepository = $categoryRepository;
        $this->questionRepository = $questionRepository;
    }

    #[Route("/user", name: "get_user_home")]
    public function get_user_home() : JsonResponse {
        return $this->json([
            "data" => [
                "nbrGames" => $this->user->countGame(),
                "bestScore" => $this->user->getBestScore(),
                "nbrCategories" => $this->user->countPlayedCategory(),
                "nbrAnsweredQuestions" => $this->gameRepository->countAnsweredQuestions($this->user),
                "latestGames" => $this->serializeManager->serializeContent(
                    $this->gameRepository->findBy(["user" => $this->user], ["created_at" => "DESC"], 10, 1)
                )
            ]
        ], Response::HTTP_OK);
    }

    #[Route('/admin', name: 'get_admin_home')]
    public function get_admin_home(): JsonResponse {
        return $this->json([
            "data" => $this->serializeManager->serializeContent([
                "nbrUsers" => $this->userRepository->countUsers(),
                "nbrParties" => 0,
                "nbrQuestions" => $this->questionRepository->countQuestions(),
                "best-scores" => []
            ])
        ], Response::HTTP_OK);
    }
}
