<?php

namespace App\Repository;

use App\Entity\Game;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Game>
 *
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    public function save(Game $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Game $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param int limit
     * @return Game[]
     */
    public function getBestScores(int $limit = 10): array {
        return $this->createQueryBuilder("game")
            ->groupBy("game.user")
            ->orderBy("game.score", "DESC")
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Count all games
     * 
     * @return int
     */
    public function countGames(): int {
        return $this->createQueryBuilder("game")
            ->select("COUNT(game.id) as nbrGames")
            ->getQuery()
            ->getSingleResult()["nbrGames"]
        ;
    }

    /**
     * @param User
     * @return int
     */
    public function countAnsweredQuestions(User $user): int {
        return $this->createQueryBuilder("game")
            ->select("COUNT(game_detail.id) as nbrAnsweredQuestions")
            ->leftJoin("game.gameDetails", "game_detail")
            ->getQuery()
            ->getSingleResult()["nbrAnsweredQuestions"]
        ;
    }

    /**
     * @param User user
     * @param string mode
     * @return Game[]
     */
    public function countGameByMode(User $user, string $mode) : array {
        return $this->createQueryBuilder("game")
            ->select("COUNT(game.id) as nbrGames")
            ->where("game.user = :user")
            ->andWhere("game.mode = :mode")
            ->setParameters([
                "user" => $user,
                "mode" => $mode
            ])
            ->getQuery()
            ->getSingleResult()["nbrGames"]
        ;
    }
}
