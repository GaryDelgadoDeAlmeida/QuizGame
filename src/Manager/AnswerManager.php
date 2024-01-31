<?php

namespace App\Manager;

use App\Entity\Answer;
use App\Entity\Question;
use App\Enum\AnswerEnum;
use App\Repository\AnswerRepository;

class AnswerManager {

    private AnswerRepository $answerRepository;

    function __construct(AnswerRepository $answerRepository) {
        $this->answerRepository = $answerRepository;
    }

    public function fillAnswer(array $fields, Answer $answer = new Answer()) : Answer|string {
        $currentTime = new \DateTimeImmutable();

        try {
            if($answer->getId() != null) {
                $answer->setUpdatedAt($currentTime);
            } else {
                $answer->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == AnswerEnum::ANSWER_LABEL) $answer->setAnswer($fieldValue);
                elseif($fieldName == AnswerEnum::ANSWER_IS_ANSWER) $answer->setIsAnswer($fieldValue);
            }

            $this->answerRepository->save($answer, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $answer;
    }

    /**
     * @param Question question
     * @param string answer|possible choice of the question
     * @param bool is answer of the question
     */
    public function postAnswer(Question $question, string $answer, bool $is_answer) : Answer|string {
        $answer = (new Answer())
            ->setQuestion($question)
            ->setAnswer($answer)
            ->setIsAnswer($is_answer)
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        try {
            $this->answerRepository->save($answer, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $answer;
    }
}