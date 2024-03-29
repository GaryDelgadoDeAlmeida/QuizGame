<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Enum\GameModeEnum;
use App\Manager\UserManager;
use App\Manager\SerializeManager;
use App\Repository\GameRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route("/api", name: 'api_')]
class UserController extends AbstractController
{
    private User $user;
    private UserManager $userManager;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;
    private GameRepository $gameRepository;
    
    public function __construct(
        Security $security,
        UserManager $userManager,
        SerializeManager $serializeManager,
        UserRepository $userRepository,
        GameRepository $gameRepository
    ) {
        $this->user = $security->getUser();
        $this->userManager = $userManager;
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
        $this->gameRepository = $gameRepository;
    }

    #[Route('/users', name: 'get_users')]
    public function get_users(Request $request): JsonResponse {
        $limit = 30;
        $offset = is_numeric($request->get("offset")) && (int)$request->get("offset") > 0 ? (int)$request->get("offset") : 1;

        return $this->json([
            "limit" => $limit,
            "offset" => $offset,
            "maxOffset" => ceil($this->userRepository->countUsers() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->userRepository->findBy([], ["email" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route("/user", name: "post_user", methods: ["POST"])]
    public function post_user(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "data" => [
                    "message" => "The content in the body request can't be empty"
                ]
            ], Response::HTTP_FORBIDDEN);
        }

        // Check the unicity of the email
        if($this->userRepository->findOneBy(["email" => $jsonContent["email"]])) {
            return $this->json([
                "data" => [
                    "message" => "An user using the email address {$jsonContent["email"]} already exist"
                ]
            ], Response::HTTP_FORBIDDEN);
        }

        try {
            $user = (new User())
                ->setEmail($jsonContent["email"])
                ->setRoles(["ROLE_USER"])
            ;
            $user->setPassword($this->userManager->hashPassword($user, $jsonContent["password"]));

            $this->userRepository->save($user, true);
        } catch(\Exeception $e) {
            return $this->json([
                "data" => [
                    "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                    "message" => $e->getMessage()
                ]
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $this->json([
            "data" => $this->serializeManager->serializeContent($user)
        ], Response::HTTP_CREATED);
    }

    #[Route("/user/me", name: "get_profile", methods: ["GET", "UPDATE", "PUT"])]
    public function get_profile(Request $request) : JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent([
                "user" => $this->user,
                "pastCompetitions" => $this->gameRepository->findBy(["user" => $this->user, "mode" => GameModeEnum::MODE_CHALLENGE], ["created_at" => "DESC"]),
                "pastGames" => $this->gameRepository->findBy(["user" => $this->user, "mode" => GameModeEnum::MODE_STANDARD], ["created_at" => "DESC"]),
                "pastScores" => $this->gameRepository->findBy(["user" => $this->user], ["score" => "DESC"]),
                "pastPlayedCategories" => $this->user->getPlayedCategories()
            ])
        ], Response::HTTP_OK);
    }

    #[Route("/user/me/remove", name: "remove_profile", methods: ["DELETE"])]
    public function remove_profile() : JsonResponse {
        return $this->json([
            "data" => ["Route under construction"]
        ], Response::HTTP_OK);
    }

    #[Route("/user/me/games", name: "get_user_profile_game", methods: ["GET"])]
    public function get_user_profile_game(Request $request) : JsonResponse {
        $limit = 20;
        $offset = $request->get("offset");
        $offset = is_numeric($offset) && $offset > 0 ? $offset : 1;
        $mode = $request->get("mode", "standard");

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->gameRepository->countGameByMode() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->gameRepository->findBy(["user" => $this->user, "mode" => $mode], ["created_at" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ]);
    }

    #[Route("/user/{userID}", name: "get_user", methods: ["GET"])]
    public function get_user(int $userID) : JsonResponse {
        $user = $this->userRepository->find($userID);
        if(!$user) {
            return $this->json([
                "data" => [
                    "message" => "User not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }
        return $this->json([
            "data" => $user
        ], Response::HTTP_OK);
    }

    #[Route("/user/{userID}/update", name: "update_user", methods: ["UPDATE", "PUT"])]
    public function update_user(Request $request, int $userID) : JsonResponse {
        $user = $this->userRepository->find($userID);
        if(!$user) {
            return $this->json([
                "data" => [
                    "message" => "User not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "data" => [
                    "message" => "The content in the body request can't be empty"
                ]
            ], Response::HTTP_FORBIDDEN);
        }
        return $this->json([
            "data" => ["Route under construction"]
        ], Response::HTTP_OK);
    }

    #[Route("/user/{userID}/remove", name: "update_user", methods: ["DELETE"])]
    public function remove_user(int $userID) : JsonResponse {
        if($userID == $this->user->getId()) {
            return $this->json([
                "data" => [
                    "message" => "You can't remove your account by this way."
                ]
            ], Response::HTTP_FORBIDDEN);
        }
        $user = $this->userRepository->find($userID);
        if(!$user) {
            return $this->json([
                "data" => [
                    "message" => "User not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $this->userRepository->remove($user, true);
        } catch(\Exception $e) {
            return $this->json([
                "data" => [
                    "message" => $e->getMessage()
                ]
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "data" => null
        ], Response::HTTP_ACCEPTED);
    }
}
