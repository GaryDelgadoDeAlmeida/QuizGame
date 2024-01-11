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

//    /**
//     * @return GameDetail[] Returns an array of GameDetail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?GameDetail
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
