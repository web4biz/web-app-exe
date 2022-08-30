<template>
    <router-view />
</template>

<script setup lang="ts">
import { Platform }         from 'quasar';

import debug                            from 'debug';
const log                               = debug('app:App');

log( 'Platform', Platform.is );
</script>
