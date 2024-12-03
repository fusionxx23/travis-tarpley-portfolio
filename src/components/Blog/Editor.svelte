<script lang="ts">
  import { remark } from "remark";
  import remarkGfm from "remark-gfm";
  import remarkHtml from "remark-html";
  export let content = "";
  let blog = "";
  let markdown = "";

  $: createMD(blog).then((r) => r);
  async function createMD(s: string) {
    const blogHtml = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(s);
    markdown = blogHtml.toString();
  }
</script>

<div class="grid grid-cols-2 gap-x-2 w-screen px-10">
  <div class=" w-full">
    <div>
      <label for="blog">Blog Post</label>
    </div>
    <textarea
      class="text-black bg-white/60 w-full p-2 h-[600px] overflow-y-scroll"
      name="blog"
      id="blog"
      bind:value={blog}
      required>{content}</textarea
    >
  </div>
  <div>
    <h1>Markdown</h1>
    <div
      class="markdown-body border h-[600px] p-4 overflow-y-scroll"
    >
      {@html markdown}
    </div>
  </div>
</div>
