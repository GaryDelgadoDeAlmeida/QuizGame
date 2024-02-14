<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Manager\QuestionManager;
use App\Manager\SerializeManager;
use App\Repository\AnswerRepository;
use App\Repository\CategoryRepository;
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
    private QuestionManager $questionManager;
    private SerializeManager $serializeManager;
    private AnswerRepository $answerRepository;
    private QuestionRepository $questionRepository;
    
    public function __construct(
        Security $security,
        QuestionManager $questionManager,
        SerializeManager $serializeManager,
        AnswerRepository $answerRepository,
        QuestionRepository $questionRepository
    ) {
        $this->user = $security->getUser();
        $this->questionManager = $questionManager;
        $this->serializeManager = $serializeManager;
        $this->answerRepository = $answerRepository;
        $this->questionRepository = $questionRepository;
    }
    
    #[Route('/questions', name: 'get_questions', methods: ["GET"])]
    public function get_questions(Request $request): JsonResponse
    {
        $limit = 10;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") > 0 ? $request->get("offset") : 1;

        return $this->json([
            "limit" => $limit,
            "offset" => $offset,
            "maxOffset" => ceil($this->questionRepository->countQuestions() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->questionRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route("/question", name: "post_question", methods: ["POST"])]
    public function post_question(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $fields = $this->questionManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $question = $this->questionManager->fillQuestion($fields);
            if(is_string($question)) {
                return $this->json([
                    "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                    "message" => $question
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch(\Exception $e) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($question), 
            Response::HTTP_CREATED
        );
    }

    #[Route("/question/{questionID}", name: "get_question", methods: ["GET"])]
    public function get_question(int $questionID) : JsonResponse {
        $question = $this->questionRepository->find($questionID);
        if(!$question) {
            return $this->json([
                "code" => Response::HTTP_NOT_FOUND,
                "message" => "Question not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($question), 
            Response::HTTP_OK
        );
    }

    #[Route("/question/{questionID}/update", name: "update_question", methods: ["POST", "UPDATE", "PUT"])]
    function update_question(int $questionID, Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $question = $this->questionRepository->find($questionID);
        if(!$question) {
            return $this->json([
                "code" => Response::HTTP_NOT_FOUND,
                "message" => "The question couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->questionManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $question = $this->questionManager->fillQuestion($fields, $question);
            if(is_string($question)) {
                return $this->json([
                    "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                    "message" => $question
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch(\Exception $e) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($question), 
            Response::HTTP_ACCEPTED
        );
    }

    #[Route("/question/{questionID}/remove", name: "remove_question", methods: ["DELETE"])]
    public function remove_question(int $questionID, Request $request) : JsonResponse {
        $question = $this->questionRepository->find($questionID);
        if(!$question) {
            return $this->json([
                "code" => Response::HTTP_NOT_FOUND,
                "message" => "The question couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $answers = $question->getAnswers();
            $question->setCategory(null);

            foreach($answers as $answer) {
                $this->answerRepository->remove($answer, true);
            }

            $this->questionRepository->remove($question, true);
        } catch(\Exception $e) {
            return $this->json([
                "code" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "code" => Response::HTTP_OK,
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
