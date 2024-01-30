<?php

namespace App\Manager;

use App\Entity\Category;
use App\Repository\CategoryRepository;

class CategoryManager {

    private CategoryRepository $categoryRepository;

    function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function fillCategory(Category $category = new Category()) {
        // 
    }

    /**
     * @param Category
     * @param string label
     * @param string label key
     * @return Category|string
     */
    public function updateCategory(Category $category, string $label, string $labelKey) : Category|string {
        try {
            $category
                ->setLabel($label)
                ->setLabelKey($labelKey)
                ->setUpdatedAt(new \DateTimeImmutable())
            ;

            $this->categoryRepository->save($category, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $category;
    }
}