<template>
    <div class="app-outer fill-body" id="app">
        <navigation-topbar/>
        <main class="app-content fill-body">
            <router-view/>
        </main>
        <navigation-footer id="footer" />
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import NavigationTopbar from "./components/NavigationTopbar.vue";
import NavigationFooter from "./components/NavigationFooter.vue";

@Component({
    components: {
        NavigationTopbar,
        NavigationFooter
    }
})

export default class App extends Vue {

}
</script>
