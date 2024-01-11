<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\UserManager;
use App\Manager\SerializeManager;
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
    
    public function __construct(
        Security $security,
        UserManager $userManager,
        SerializeManager $serializeManager,
        UserRepository $userRepository
    ) {
        $this->user = $security->getUser();
        $this->userManager = $userManager;
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
    }

    #[Route('/users', name: 'get_users')]
    public function get_users(Request $request): JsonResponse {
        $limit = 30;
        $offset = is_int($request->get("offset")) && (int)$request->get("offset") > 0 ? (int)$request->get("offset") : 1;

        return $this->json([
            "limit" => $limit,
            "offset" => $offset,
            "maxOffset" => ceil($this->userRepository->countUsers() / $limit),
            "data" => $this->serializeManager->serializeContent(
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
            "data" => $this->serializeManager->serializeContent(
                $this->user
            )
        ], Response::HTTP_OK);
    }

    #[Route("/user/me/remove", name: "remove_profile", methods: ["DELETE"])]
    public function remove_profile() : JsonResponse {
        return $this->json([
            "data" => ["Route under construction"]
        ], Response::HTTP_OK);
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

        // try {
        //     $this->userRepository->remove($user, true);
        // } catch(\Exception $e) {
        //     return $this->json([
        //         "data" => [
        //             "message" => $e->getMessage()
        //         ]
        //     ], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }

        return $this->json([
            "data" => null
        ], Response::HTTP_ACCEPTED);
    }
}
