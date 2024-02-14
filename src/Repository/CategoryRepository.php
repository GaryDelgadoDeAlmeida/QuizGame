<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Category;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Category>
 *
 * @method Category|null find($id, $lockMode = null, $lockVersion = null)
 * @method Category|null findOneBy(array $criteria, array $orderBy = null)
 * @method Category[]    findAll()
 * @method Category[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    public function save(Category $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Category $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getCategoriesFormFields(): array {
        return $this->createQueryBuilder("category")
            ->select("category.id, category.label, category.label_key")
            ->orderBy("category.label", "ASC")
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @param int offset
     * @param int limit
     * @return Category[]
     */
    public function getCategories(int $offset, int $limit): array {
        return $this->createQueryBuilder("category")
            ->select("category.id, category.label, category.label_key, COUNT(question.id) as nbrQuestions")
            ->leftJoin("category.questions", "question")
            ->groupBy("category.id")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->orderBy("category.label", "ASC")
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Count all category stored in the database
     * 
     * @return int
     */
    public function countCategories(): int {
        return $this->createQueryBuilder("category")
            ->select("COUNT(category.id) as nbrCategories")
            ->getQuery()
            ->getSingleResult()["nbrCategories"]
        ;
    }
}
