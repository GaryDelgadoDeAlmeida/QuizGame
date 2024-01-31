<?php

namespace App\Manager;

use App\Entity\Answer;
use App\Entity\Question;
use App\Enum\AnswerEnum;
use App\Enum\QuestionEnum;
use App\Enum\DifficultyEnum;
use App\Manager\AnswerManager;
use App\Repository\AnswerRepository;
use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
use Symfony\Component\HttpFoundation\Response;

class QuestionManager {

    private AnswerManager $answerManager;
    private AnswerRepository $answerRepository;
    private CategoryRepository $categoryRepository;
    private QuestionRepository $questionRepository;

    function __construct(
        AnswerManager $answerManager,
        AnswerRepository $answerRepository, 
        CategoryRepository $categoryRepository, 
        QuestionRepository $questionRepository
    ) {
        $this->answerManager = $answerManager;
        $this->answerRepository = $answerRepository;
        $this->categoryRepository = $categoryRepository;
        $this->questionRepository = $questionRepository;
    }

    /**
     * @param array json content / sended body in the body request
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = QuestionEnum::getAvailableChoice();

        foreach ($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $allowedFields) && empty($fieldValue)) {
                throw new \Exception("The field '{$fieldName}' must have a value", Response::HTTP_FORBIDDEN);
            }

            if($fieldName == QuestionEnum::QUESTION_LABEL) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The field '{$fieldName}' mustn't exceed 255 characters length", Response::HTTP_FORBIDDEN);
                }
            }
            elseif($fieldName == QuestionEnum::QUESTION_CATEGORY) {
                $category = null;
                if(is_array($fieldValue) && isset($fieldValue["id"])) {
                    $category = $this->categoryRepository->find($fieldValue["id"]);
                } elseif(is_string($fieldValue)) {
                    $category = $this->categoryRepository->findOneBy(["label_key" => $fieldValue]);
                } else {
                    throw new Exception("An error with the field {$fieldName}.", Response::HTTP_INTERNAL_SERVER_ERROR);
                }

                if(!$category) {
                    throw new Exception("The category couldn't be found", Response::HTTP_NOT_FOUND);
                }

                $fieldValue = $category;
            }
            elseif($fieldName == QuestionEnum::QUESTION_DIFFICULTY) {
                if(!in_array($fieldValue, DifficultyEnum::getAvailableChoices())) {
                    throw new Exception("The {$fieldName} field choice '{$fieldValue}' isn't allowed.", Response::HTTP_FORBIDDEN);
                }
            }
            elseif($fieldName == QuestionEnum::QUESTION_MULTIPLE_ANSWERS) {
                if(!is_bool($fieldValue)) {
                    throw new Exception("The {$fieldName} field must be a boolean value", Response::HTTP_FORBIDDEN);
                }
            }
            elseif($fieldName == QuestionEnum::QUESTION_ANSWERS) {
                if(!is_array($fieldValue)) {
                    throw new Exception("An array of answers is expected", Response::HTTP_FORBIDDEN);
                }

                $this->haveAnswers($fieldValue, $jsonContent[QuestionEnum::QUESTION_MULTIPLE_ANSWERS] ?? false);
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param Question
     * @return Question|string Return a question object or a string containing an error message
     */
    public function fillQuestion(array $fields, Question $question = new Question()) : Question|string {
        $currentTime = new \DateTimeImmutable();

        try {
            if($question->getId() != null) {
                $question->setUpdatedAt($currentTime);
            } else {
                $question->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == QuestionEnum::QUESTION_CATEGORY) $question->setCategory($fieldValue);
                elseif($fieldName == QuestionEnum::QUESTION_LABEL) $question->setQuestion($fieldValue);
                elseif($fieldName == QuestionEnum::QUESTION_DIFFICULTY) $question->setDifficulty($fieldValue);
                elseif($fieldName == QuestionEnum::QUESTION_MULTIPLE_ANSWERS) $question->setMultipleAnswer($fieldValue);
                elseif($fieldName == QuestionEnum::QUESTION_ANSWERS) {
                    foreach ($fieldValue as $answerRowField) {
                        $answer = $this->answerManager->fillAnswer(
                            $answerRowField, 
                            isset($answerRowField["id"]) 
                                ? $this->answerRepository->find($answerRowField["id"]) 
                                : new Answer()
                        );

                        if(is_string($answer)) {
                            throw new \Exception($answer);
                        }

                        if(!isset($answerRowField["id"])) {
                            $question->addAnswer($answer);
                        }
                    }
                }
            }

            // Save all changes/create the question into database
            $this->questionRepository->save($question, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $question;
    }

    /**
     * @param array answers
     * @param bool allow multiple answers
     * @return bool|\Exception
     */
    public function haveAnswers(array $answers, bool $multipleChoice = false) {
        $haveAnswer = false;
        $countAnswers = 0;
        
        foreach($answers as $answer) {
            if($answer[AnswerEnum::ANSWER_IS_ANSWER]) {
                $haveAnswer = true;
                $countAnswers++;
            }
        }

        if($countAnswers == 0) {
            throw new \Exception("No answer has been selected. Please select an answer", Response::HTTP_FORBIDDEN);
        }

        if($countAnswers > 1 && !$multipleChoice) {
            throw new \Exception("The question don't allow multiple answers. Please, allow multiple answers or uncheck an answer", Response::HTTP_FORBIDDEN);
        }

        if($countAnswers == 1 && $multipleChoice) {
            throw new \Exception("The question allow multiple answers. You need to select at least 2 answers.", Response::HTTP_FORBIDDEN);
        }

        return true;
    }
}