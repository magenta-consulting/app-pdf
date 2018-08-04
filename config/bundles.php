<?php

return [
    Symfony\Bundle\FrameworkBundle\FrameworkBundle::class => ['all' => true],
    Bean\Bundle\DevToolBundle\BeanDevToolBundle::class => ['dev' => true, 'test' => true],
    Knp\Bundle\SnappyBundle\KnpSnappyBundle::class => ['all' => true],
    Magenta\Bundle\AppPdfBundle\MagentaAppPdfBundle::class => ['all' => true, 'test' => true],
];
