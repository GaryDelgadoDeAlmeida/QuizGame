<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\QuestionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class QuestionController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private QuestionRepository $questionRepository;
    
    public function __construct(
        Security $security,
        SerializeManager $serializeManager,
        QuestionRepository $questionRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->questionRepository = $questionRepository;
    }
    
    #[Route('/questions', name: 'get_questions', methods: ["GET"])]
    public function get_questions(Request $request): JsonResponse
    {
        $limit = 30;
        $offset = is_int($request->get("offset")) && $request->get("offset") > 0 ? $request->get("offset") : 1;

        return $this->json([
            "limit" => $limit,
            "offset" => $offset,
            "maxOffset" => ceil($this->questionRepository->countQuestions() / $limit),
            "data" => $this->serializeManager->serializeContent(
                $this->questionRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route("/question/{questionID}", name: "get_question", methods: ["GET"])]
    public function get_question(int $questionID) : JsonResponse {
        $question = $this->questionRepository->find($questionID);
        if(!$question) {
            return $this->json([
                "data" => [
                    "message" => "Question not found"
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "data" => $this->serializeManager->serializeContent($question)
        ], Response::HTTP_OK);
    }
}
