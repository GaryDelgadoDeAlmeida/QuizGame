<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\CategoryManager;
use App\Manager\SerializeManager;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class CategoryController extends AbstractController
{
    private User $user;
    private CategoryManager $categoryManager;
    private SerializeManager $serializeManager;
    private CategoryRepository $categoryRepository;

    public function __construct(
        Security $security, 
        CategoryManager $categoryManager,
        SerializeManager $serializeManager, 
        CategoryRepository $categoryRepository
    ) {
        $this->user = $security->getUser();
        $this->categoryManager = $categoryManager;
        $this->serializeManager = $serializeManager;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/categories', name: 'get_categories', methods: ["GET"])]
    public function get_categories(Request $request): JsonResponse {
        $response = [];
        if($request->get("fields", null) == "all") {
            $response = [
                "nbrCategories" => $this->categoryRepository->countCategories(),
                "results" => $this->categoryRepository->findAll()
            ];
        } else {
            $limit = 15;
            $offset = is_numeric($request->get("offset")) && $request->get("offset") > 1 ? $request->get("offset") : 1;

            $response = [
                "offset" => $offset,
                "maxOffset" => ceil($this->categoryRepository->countCategories() / $limit),
                "results" => $this->categoryRepository->findBy([], ["label" => "ASC"], $limit, ($offset - 1) * $limit)
            ];
        }

        return $this->json(
            $this->serializeManager->serializeContent($response), 
            Response::HTTP_OK
        );
    }

    #[Route("/category", name: "post_category", methods: ["POST"])]
    public function post_category(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    #[Route("/category/{categoryID}", name: "get_category", methods: ["GET"])]
    public function get_category(int $categoryID): JsonResponse {
        $category = $this->categoryRepository->find($categoryID);
        if(!$category) {
            return $this->json([
                "code" => Response::HTTP_NOT_FOUND,
                "message" => "Category not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($category), 
            Response::HTTP_OK
        );
    }

    #[Route("/category/{categoryID}/update", name: "update_category", methods: ["POST", "UPDATE"])]
    public function update_category(Request $request, int $categoryID): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $category = $this->categoryRepository->find($jsonContent["id"]);
            if(!$category) {
                return $this->json([
                    "code" => Response::HTTP_NOT_FOUND,
                    "message" => "Category not found"
                ], Response::HTTP_NOT_FOUND);
            }

            $this->categoryManager->updateCategory($category, $jsonContent["label"], $jsonContent["labelKey"]);
        } catch(\Exception $e) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $this->json(null, Response::HTTP_ACCEPTED);
    }
}
