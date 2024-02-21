<?php

namespace App\Manager;

use App\Entity\Game;
use App\Entity\User;
use App\Enum\GameEnum;
use App\Enum\GameModeEnum;
use Symfony\Component\HttpFoundation\Response;

class GameManager {

    private GameRepository $gameRepository;
    private CategoryRepository $categoryRepository;


    function __construct(GameRepository $gameRepository, CategoryRepository $categoryRepository) {
        $this->gameRepository = $gameRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = GameEnum::getChoices();
        $gameMode = GameModeEnum::getAvailableChoice();

        dd($gameMode);

        foreach($jsonContent as $fieldName => $fieldValue) {
            if($fieldName == GameEnum::GAME_CATEGORY) {
                if(!empty($fieldValue)) {
                    $category = $this->categoryRepository->findOneBy(["labelKey" => $fieldValue]);
                    if(!$category) {
                        throw new \Exception("The category", Response::HTTP_INTERNAL_SERVER_ERROR);
                    }

                    $fieldValue = $category;
                }
            }
            elseif($fieldName == GameEnum::GAME_MODE) {}
            elseif($fieldName == GameEnum::GAME_SCORE) {}
            elseif($fieldName == GameEnum::GAME_STATUS) {}

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
    public function fillGame(array $fields, User $user, Game $game = new Game()) : Game {
        try {
            if(!$game->getId()) {
                $game
                    ->setUser($user)
                    ->setCreatedAt(new \DateTimeImmutable())
                ;
            }
    
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == "category") $game->setCategory($fieldValue);
                elseif($fieldName == "status") $game->setStatus($fieldValue);
                elseif($fieldName == "score") $game->setScore($fieldValue);
                elseif($fieldName == "mode") $game->setMode($fieldValue);
            }
            
            $this->gameRepository->save($game, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $game;
    }
}