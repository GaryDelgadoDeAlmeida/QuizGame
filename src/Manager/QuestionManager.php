<?php

namespace App\Manager;

use App\Entity\Question;
use App\Repository\QuestionRepository;

class QuestionManager {

    private QuestionRepository $questionRepository;

    function __construct(QuestionRepository $questionRepository) {
        $this->questionRepository = $questionRepository;
    }

    /**
     * @param Category category
     * @param string question
     * @param string difficulty of the question (easy, medium or hard)
     * @param bool question allow multiple answer
     */
    public function postQuestion(Category $category, string $question, string $difficulty, bool $multiple_answer) : Question|string {
        $question = (new Question())
            ->setCategory($category)
            ->setQuestion($question)
            ->setDifficulty($difficulty)
            ->setMultipleAnswer($multiple_answer)
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        try {
            $this->questionRepository->save($question, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $question;
    }
}