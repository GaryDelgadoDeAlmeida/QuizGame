<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\CategoryRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class CategoryController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private CategoryRepository $categoryRepository;

    public function __construct(Security $security, SerializeManager $serializeManager, CategoryRepository $categoryRepository) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/categories', name: 'get_categories', methods: ["GET"])]
    public function get_categories(): JsonResponse {
        return $this->json([
            "data" => $this->serializeManager->serializeContent(
                $this->categoryRepository->findAll()
            )
        ], Response::HTTP_OK);
    }

    #[Route("/category/{categoryID}", name: "get_category", methods: ["GET"])]
    public function get_category(int $categoryID) : JsonResponse {
        $category = $this->categoryRepository->find($categoryID);
        if(!$category) {
            return $this->json([
                "data" => [
                    "message" => "Category not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "data" => $this->serializeManager->serializeContent($category)
        ], Response::HTTP_OK);
    }
}
