<?php

namespace App\Manager;

use App\Entity\Answer;
use App\Entity\Question;
use App\Repository\AnswerRepository;

class AnswerManager {

    private AnswerRepository $answerRepository;

    function __construct(AnswerRepository $answerRepository) {
        $this->answerRepository = $answerRepository;
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