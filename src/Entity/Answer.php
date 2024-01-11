<?php

namespace App\Entity;

use App\Repository\AnswerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnswerRepository::class)]
class Answer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    private ?Question $question = null;

    #[ORM\Column(length: 255)]
    private ?string $answer = null;

    #[ORM\Column]
    private ?bool $is_answer = false;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\OneToMany(mappedBy: 'given_answer', targetEntity: GameDetail::class)]
    private Collection $gameDetails;

    public function __construct()
    {
        $this->gameDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): static
    {
        $this->question = $question;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): static
    {
        $this->answer = $answer;

        return $this;
    }

    public function isIsAnswer(): ?bool
    {
        return $this->is_answer;
    }

    public function setIsAnswer(bool $is_answer): static
    {
        $this->is_answer = $is_answer;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

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

    /**
     * @return Collection<int, GameDetail>
     */
    public function getGameDetails(): Collection
    {
        return $this->gameDetails;
    }

    public function addGameDetail(GameDetail $gameDetail): static
    {
        if (!$this->gameDetails->contains($gameDetail)) {
            $this->gameDetails->add($gameDetail);
            $gameDetail->setGivenAnswer($this);
        }

        return $this;
    }

    public function removeGameDetail(GameDetail $gameDetail): static
    {
        if ($this->gameDetails->removeElement($gameDetail)) {
            // set the owning side to null (unless already changed)
            if ($gameDetail->getGivenAnswer() === $this) {
                $gameDetail->setGivenAnswer(null);
            }
        }

        return $this;
    }
}
