<?php

namespace App\Repository;

use App\Entity\GameDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GameDetail>
 *
 * @method GameDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameDetail[]    findAll()
 * @method GameDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameDetail::class);
    }

    public function save(GameDetail $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(GameDetail $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
