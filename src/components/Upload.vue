<template>
  <div>
  <q-uploader
      url="http://localhost:8080/uploads"
      label="Upload your images"
      :factory="factory"
      :multiple="multiple"
    >
      <template v-slot:list="scope">
        <q-list separator>
          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>

        </q-list>
      </template>
      </q-uploader>
  </div>
</template>

<script>
export default {
  name: 'upload',
  props: {
    status: Boolean,
    factory: Function,
    multiple: Boolean
  },
  data () {
    return {

    }
  }
}
</script>
