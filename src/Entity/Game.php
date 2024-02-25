<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'games')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'games')]
    private ?Category $category = null;

    #[ORM\Column(length: 20)]
    private ?string $mode = null;

    #[ORM\Column]
    private ?int $score = 0;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\OneToMany(mappedBy: 'game', targetEntity: GameDetail::class)]
    private Collection $gameDetails;

    public function __construct()
    {
        $this->gameDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
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

    public function getMode(): ?string
    {
        return $this->mode;
    }

    public function setMode(string $mode): static
    {
        $this->mode = $mode;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): static
    {
        $this->score = $score;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
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
            $gameDetail->setGame($this);
        }

        return $this;
    }

    public function removeGameDetail(GameDetail $gameDetail): static
    {
        if ($this->gameDetails->removeElement($gameDetail)) {
            // set the owning side to null (unless already changed)
            if ($gameDetail->getGame() === $this) {
                $gameDetail->setGame(null);
            }
        }

        return $this;
    }
}
