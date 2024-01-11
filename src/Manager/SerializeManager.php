<?php

namespace App\Manager;

use Symfony\Component\Serializer\SerializerInterface;

class SerializeManager {

    private SerializerInterface $serializer;

    function __construct(SerializerInterface $serializer) {
        $this->serializer = $serializer;
    }

    /**
     * @param mixed entities
     */
    public function serializeContent($entities) {
        return $this->serializer->normalize(
            $entities, 
            "json", 
            ["circular_reference_handler" => function ($object) {
                return $object->getId();
            }]
        );
    }
}