<template>
    <div>
        <svg id="spinner" viewbox="0 0 80 80">
            <g fill="none">
                <mask id="b" fill="#fff">
                    <path id="around" d="M 0 0 H 80 V 80 H 0 Z" />
                </mask>
                <circle transform="translate(40)" mask="url(#b)" stroke="#4b4b4b" stroke-width="4" cy="40" r="15" />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
   
    @Component
    export default class Spinner extends Vue {
    }

</script>

<style>
    #spinner {
        height: 80px;
        width: 80px;
        animation: rotateAnimation .75s linear infinite;
    }

    @keyframes rotateAnimation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>