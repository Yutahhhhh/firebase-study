<template>
  <div ref="calendarRef" />
</template>

<script setup lang="ts">
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { useDisplay } from 'vuetify'

const calendarRef = ref<HTMLDivElement | null>(null)
const display = ref(useDisplay())

onMounted(() => {
  if (!calendarRef.value) return

  const { apiKey } = useRuntimeConfig().public
  const calendar = new Calendar(calendarRef.value, {
    locale: 'ja',
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin],
    initialView: display.value.xs ? 'listMonth' : 'dayGridMonth',
    eventSources: [
      {
        googleCalendarApiKey: apiKey,
        googleCalendarId: 'ja.japanese#holiday@group.v.calendar.google.com'
      }
    ]
  })

  calendar.render()
})
</script>
