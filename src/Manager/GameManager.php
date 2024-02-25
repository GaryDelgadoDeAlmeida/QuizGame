<?php

namespace App\Manager;

use App\Entity\Game;
use App\Entity\User;
use App\Enum\GameEnum;
use App\Entity\GameDetail;
use App\Enum\GameModeEnum;
use App\Enum\GameDetailEnum;
use App\Repository\GameRepository;
use App\Repository\AnswerRepository;
use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
use App\Repository\GameDetailRepository;
use Symfony\Component\HttpFoundation\Response;

class GameManager {

    private GameRepository $gameRepository;
    private AnswerRepository $answerRepository;
    private QuestionRepository $questionRepository;
    private CategoryRepository $categoryRepository;
    private GameDetailRepository $gameDetailRepository;


    function __construct(
        GameRepository $gameRepository, 
        AnswerRepository $answerRepository,
        QuestionRepository $questionRepository,
        CategoryRepository $categoryRepository,
        GameDetailRepository $gameDetailRepository
    ) {
        $this->gameRepository = $gameRepository;
        $this->answerRepository = $answerRepository;
        $this->questionRepository = $questionRepository;
        $this->categoryRepository = $categoryRepository;
        $this->gameDetailRepository = $gameDetailRepository;
    }

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = GameEnum::getChoices();
        $gameMode = GameModeEnum::getChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if($fieldName == GameEnum::GAME_CATEGORY) {
                if(!empty($fieldValue)) {
                    $category = $this->categoryRepository->findOneBy(["labelKey" => $fieldValue]);
                    if(!$category) {
                        throw new \Exception("The category {$fieldValue} don't exist", Response::HTTP_INTERNAL_SERVER_ERROR);
                    }

                    $fieldValue = $category;
                }
            } elseif($fieldName == GameEnum::GAME_MODE) {
                if(!in_array($fieldValue, $gameMode)) {
                    throw new \Exception("The game mode '{$fieldValue}' isn't allowed", Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            } elseif($fieldName == GameEnum::GAME_SCORE) {
                // 
            } elseif($fieldName == GameEnum::GAME_STATUS) {
                // 
            } elseif($fieldName == GameEnum::GAME_DETAILS) {
                if(empty($fieldValue)) {
                    throw new \Exception("There is no detail about the game", Response::HTTP_INTERNAL_SERVER_ERROR);
                }

                $game_detail = [];
                
                foreach($fieldValue as $index => $row) {
                    $game_detail[$index] = [
                        GameEnum::GAME_GIVEN_ANSWER => $this->answerRepository->findOneBy(["answer" => $row[GameEnum::GAME_GIVEN_ANSWER]]),
                        GameEnum::GAME_GIVEN_QUESTION => $this->questionRepository->find($row["question_id"])
                    ];
                }

                $fieldValue = $game_detail;
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array field
     * @param User user
     * @param Game game
     * @return Game
     */
    public function fillGame(array $fields, User $user, ?Game $game = new Game()) : Game|string {
        try {
            if(!$game->getId()) {
                $game
                    ->setUser($user)
                    ->setCreatedAt(new \DateTimeImmutable())
                ;
            }
    
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == GameEnum::GAME_CATEGORY) $game->setCategory($fieldValue);
                elseif($fieldName == GameEnum::GAME_MODE) $game->setMode($fieldValue);
                elseif($fieldName == GameEnum::GAME_STATUS) $game->setStatus($fieldValue);
                elseif($fieldName == GameEnum::GAME_SCORE) $game->setScore($fieldValue);
                elseif($fieldName == GameEnum::GAME_MODE) $game->setMode($fieldValue);
            }
            
            $this->gameRepository->save($game, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $game;
    }

    /**
     * 
     */
    public function fillGameDetail(array $fields, Game $game, ?GameDetail $gameDetail = new GameDetail()) : GameDetail|string {
        try {
            if(!$gameDetail->getId()) {
                $gameDetail
                    ->setGame($game)
                    ->setCreatedAt(new \DateTimeImmutable())
                ;
            }
    
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == GameEnum::GAME_GIVEN_QUESTION) $gameDetail->setGivenQuestion($fieldValue);
                elseif($fieldName == GameEnum::GAME_GIVEN_ANSWER) $gameDetail->setGivenAnswer($fieldValue);
            }

            $this->gameDetailRepository->save($gameDetail, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $gameDetail;
    }
}