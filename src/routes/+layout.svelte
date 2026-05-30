<script lang="ts">
  import { onMount, setContext, type Snippet } from "svelte"
  import Topbar from "$lib/Topbar.svelte"
  import "./global.css"

  import NotificationsUi from "$lib/NotificationsUI.svelte"
  import { manager } from "$lib/grid/widgets.svelte"
  import { rover } from "$lib/data/rover.svelte"

  setContext("manager", manager.manager)

  onMount(() => {
    rover.start()
  })

  let { children }: { children?: Snippet } = $props()
</script>

<NotificationsUi />
<section>
  <Topbar />

  {@render children?.()}
</section>

<style>
  section {
    overflow-y: auto;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
