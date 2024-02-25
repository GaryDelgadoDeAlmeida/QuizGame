<?php

namespace App\Entity;

use App\Repository\GameDetailRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GameDetailRepository::class)]
class GameDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'gameDetails')]
    private ?Game $game = null;

    #[ORM\ManyToOne(inversedBy: 'gameDetails')]
    private ?Question $given_question = null;

    #[ORM\ManyToOne(inversedBy: 'gameDetails')]
    private ?Answer $given_answer = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): static
    {
        $this->game = $game;

        return $this;
    }

    public function getGivenQuestion(): ?Question
    {
        return $this->given_question;
    }

    public function setGivenQuestion(?Question $given_question): static
    {
        $this->given_question = $given_question;

        return $this;
    }

    public function getGivenAnswer(): ?Answer
    {
        return $this->given_answer;
    }

    public function setGivenAnswer(?Answer $given_answer): static
    {
        $this->given_answer = $given_answer;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }
}
