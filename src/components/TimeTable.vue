<template>
  <div class="timetable-wrapper page-restrict-width">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TimeTable',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    subjects: {}, // Object to cache subjects by their ID
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
  }),
  mounted() {
    this.fetchCourses(); // Fetch courses when the component is mounted
    this.$refs.calendar.checkChange(); // Check the calendar view changes
  },
  methods: {
    fetchCourses() {
      // Fetch the courses data from the API
      axios.get('http://localhost:8000/api/student-courses', { headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }})
          .then(response => {
            const courses = response.data.courses;
            const promises = courses.map(course => this.fetchSubject(course.subject_id)
                .then(subject => ({
                  name: subject.title,
                  start: new Date(course.start_date),
                  end: new Date(course.end_date),
                  color: this.colors[course.id % this.colors.length],
                  timed: true,
                }))
            );
            // Resolve all promises and update the events state
            Promise.all(promises).then(events => {
              this.events = events;
            });
          })
          .catch(error => {
            console.error('There was an error fetching the courses!', error);
          });
    },
    fetchSubject(subject_id) {
      // Check if the subject is already cached
      if (this.subjects[subject_id]) {
        return Promise.resolve(this.subjects[subject_id]);
      }
      // Fetch the subject data from the API
      return axios.get(`http://localhost:8000/api/subjects/${subject_id}`)
          .then(response => {
            const subject = response.data.subject;
            this.subjects[subject_id] = subject; // Cache the subject
            return subject;
          })
          .catch(error => {
            console.error(`There was an error fetching the subject ${subject_id}!`, error);
            return {title: 'Unknown Subject'}; // Default subject title in case of an error
          });
    },
    viewDay({date}) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      this.fetchCourses(); // Fetch courses whenever the calendar range is updated
    },
  },
};
</script>

<style>
.timetable-wrapper {
  height: 100%;
  margin-top: 6rem;
}
</style>
