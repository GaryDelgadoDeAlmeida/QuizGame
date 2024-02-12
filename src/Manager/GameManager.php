<?php

use App\Entity\Game;

class GameManager {
    public GameRepository $gameRepository;

    function __construct(GameRepository $gameRepository) {
        $this->gameRepository = $gameRepository;
    }

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];

        return $fields;
    }

    /**
     * @param array field
     * @param Game game
     * @return Game
     */
    public function fillGame(array $fields, Game $game = new Game()) : Game {
        if(!$game->getId()) {
            $game->setCreatedAt(new \DateTimeImmutable());
        }

        foreach($fields as $fieldName => $fieldValue) {
            if($fieldName == "category") $game->setCategory($fieldValue);
            elseif($fieldName == "user") $game->setUser($fieldValue);
            elseif($fieldName == "status") $game->setStatus($fieldValue);
        }

        try {
            $this->gameRepository->save($game, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $game;
    }
}