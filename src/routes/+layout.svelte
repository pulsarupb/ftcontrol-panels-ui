<script lang="ts">
  import { onMount, setContext, type Snippet } from "svelte"
  import Topbar from "$lib/Topbar.svelte"
  import "./global.css"

  import NotificationsUi from "$lib/NotificationsUI.svelte"
  import { manager } from "$lib/grid/widgets.svelte"
  import { rover } from "$lib/data/rover.svelte"
  import { global } from "$lib"
  import CanvasRender from "$lib/grid/CanvasRender.svelte"

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

  <div class="preview-cache" aria-hidden="true">
    {#each global.allTemplates as t}
      <CanvasRender {t} show={false} />
    {/each}
  </div>
</section>

<style>
  section {
    overflow-y: auto;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .preview-cache {
    display: contents;
    pointer-events: none;
  }
</style>
