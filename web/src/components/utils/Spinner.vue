<template>
    <div>
        <svg id="spinner" viewbox="0 0 80 80">
            <g fill="none">
                <mask id="b" fill="#fff">
                    <path id="around" d="M 0 0 H 80 V 80 H 0 Z" />
                </mask>
                <circle transform="translate(40)" mask="url(#b)" :stroke="color" stroke-width="4" cy="40" :r="diameter" stroke-dasharray="0 8" stroke-linecap="round" fill="transparent"/>
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
   
    @Component
    export default class Spinner extends Vue {
        @Prop({required: false, default:"#4b4b4b"})
        color!: string;

        @Prop({required: false, default:"15"})
        diameter!: string;
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