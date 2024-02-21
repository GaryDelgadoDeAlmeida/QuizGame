<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'questions')]
    private ?Category $category = null;

    #[ORM\Column(length: 255)]
    private ?string $question = null;

    #[ORM\Column(length: 255)]
    private ?string $difficulty = null;

    #[ORM\Column]
    private ?bool $multiple_answer = false;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: Answer::class, cascade: ["remove", "persist"])]
    private Collection $answers;

    #[ORM\OneToMany(mappedBy: 'given_question', targetEntity: GameDetail::class)]
    private Collection $gameDetails;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
        $this->gameDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): static
    {
        $this->question = $question;

        return $this;
    }

    public function getDifficulty(): ?string
    {
        return $this->difficulty;
    }

    public function setDifficulty(string $difficulty): static
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function isMultipleAnswer(): ?bool
    {
        return $this->multiple_answer;
    }

    public function setMultipleAnswer(bool $multiple_answer): static
    {
        $this->multiple_answer = $multiple_answer;

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
     * @return Collection<int, Answer>
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): static
    {
        if (!$this->answers->contains($answer)) {
            $this->answers->add($answer);
            $answer->setQuestion($this);
        }

        return $this;
    }

    public function getRandomAnswers() : Array {
        $arrayToShuffle = $this->answers->toArray();
        shuffle($arrayToShuffle);
        
        return $arrayToShuffle;
    }

    public function removeAnswer(Answer $answer): static
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuestion() === $this) {
                $answer->setQuestion(null);
            }
        }

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
            $gameDetail->setGivenQuestion($this);
        }

        return $this;
    }

    public function removeGameDetail(GameDetail $gameDetail): static
    {
        if ($this->gameDetails->removeElement($gameDetail)) {
            // set the owning side to null (unless already changed)
            if ($gameDetail->getGivenQuestion() === $this) {
                $gameDetail->setGivenQuestion(null);
            }
        }

        return $this;
    }
}
