import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

type Category = {
  id: string;
  title: string;
  taskCount: number;
  bgColor: string;
  image?: any;
  iconName?: string;
  iconFamily?: string;
  iconColor?: string;
};

const CATEGORIES: Category[] = [
  {
    id: "1",
    title: "Exercise",
    taskCount: 12,
    bgColor: "#F5F0EC",
    image: require("@/assets/images/young woman working online.png"),
  },
  {
    id: "2",
    title: "Study",
    taskCount: 12,
    bgColor: "#F5F0EC",
    image: require("@/assets/images/young woman working at desk.png"),
  },
  {
    id: "3",
    title: "Cooking",
    taskCount: 8,
    bgColor: "#FFF4EC",
    iconName: "chef-hat",
    iconFamily: "MaterialCommunityIcons",
    iconColor: "#E07B39",
  },
  {
    id: "4",
    title: "Reading",
    taskCount: 6,
    bgColor: "#EDF6FF",
    iconName: "book-open",
    iconFamily: "Feather",
    iconColor: "#3A7BD5",
  },
  {
    id: "5",
    title: "Meditation",
    taskCount: 5,
    bgColor: "#F0F4FF",
    iconName: "human-handsup",
    iconFamily: "MaterialCommunityIcons",
    iconColor: "#7B61FF",
  },
  {
    id: "6",
    title: "Coding",
    taskCount: 15,
    bgColor: "#EDFCF4",
    iconName: "code-slash",
    iconFamily: "Ionicons",
    iconColor: "#2ECC71",
  },
  {
    id: "7",
    title: "Music",
    taskCount: 9,
    bgColor: "#FFF0F5",
    iconName: "musical-notes",
    iconFamily: "Ionicons",
    iconColor: "#E91E8C",
  },
];

type TaskProgress = {
  progress: number;
  color: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  dueDate: string;
  subtasks: number;
};

type Task = {
  id: string;
  title: string;
  description: string;
  progress: TaskProgress;
};

const ONGOING_TASKS: Task[] = [
  {
    id: "1",
    title: "Mobile App Development",
    description: "Build the task manager screens with React Native",
    progress: {
      progress: 65,
      color: "#FF6B35",
      tag: "Development",
      tagColor: "#FF6B35",
      tagBg: "#FFF0EB",
      dueDate: "Aug 20",
      subtasks: 4,
    },
  },
  {
    id: "2",
    title: "Web Development",
    description: "Complete the landing page and dashboard UI",
    progress: {
      progress: 40,
      color: "#3A7BD5",
      tag: "Design",
      tagColor: "#3A7BD5",
      tagBg: "#EDF3FF",
      dueDate: "Aug 25",
      subtasks: 6,
    },
  },
  {
    id: "3",
    title: "Push Ups",
    description: "Daily workout — 3 sets of 20 reps",
    progress: {
      progress: 80,
      color: "#2ECC71",
      tag: "Fitness",
      tagColor: "#2ECC71",
      tagBg: "#EDFCF4",
      dueDate: "Today",
      subtasks: 3,
    },
  },
  {
    id: "4",
    title: "Cook Dinner",
    description: "Prepare grilled salmon with roasted vegetables",
    progress: {
      progress: 20,
      color: "#E07B39",
      tag: "Cooking",
      tagColor: "#E07B39",
      tagBg: "#FFF4EC",
      dueDate: "Today",
      subtasks: 3,
    },
  },
  {
    id: "5",
    title: "Read Design Patterns",
    description: "Chapter 5–7 of Gang of Four design patterns book",
    progress: {
      progress: 55,
      color: "#7B61FF",
      tag: "Learning",
      tagColor: "#7B61FF",
      tagBg: "#F0F4FF",
      dueDate: "Aug 18",
      subtasks: 2,
    },
  },
  {
    id: "6",
    title: "Morning Meditation",
    description: "20-minute guided mindfulness session",
    progress: {
      progress: 100,
      color: "#9B59B6",
      tag: "Wellness",
      tagColor: "#9B59B6",
      tagBg: "#F8EFFE",
      dueDate: "Today",
      subtasks: 1,
    },
  },
  {
    id: "7",
    title: "Guitar Practice",
    description: "Practice chord transitions and scales for 30 min",
    progress: {
      progress: 30,
      color: "#E91E8C",
      tag: "Music",
      tagColor: "#E91E8C",
      tagBg: "#FFF0F5",
      dueDate: "Aug 22",
      subtasks: 4,
    },
  },
  {
    id: "8",
    title: "Algorithm Study",
    description: "Solve 3 LeetCode problems — dynamic programming",
    progress: {
      progress: 70,
      color: "#16A085",
      tag: "Coding",
      tagColor: "#16A085",
      tagBg: "#EDFCF4",
      dueDate: "Aug 19",
      subtasks: 3,
    },
  },
];

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function CategoryIcon({ item }: { item: Category }) {
  const circleStyle = {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    alignSelf: "center" as const,
    marginBottom: 8,
  };

  if (item.image) {
    return (
      <Image
        source={item.image}
        style={styles.categoryImage}
        resizeMode="contain"
      />
    );
  }

  if (item.iconFamily === "MaterialCommunityIcons") {
    return (
      <View style={circleStyle}>
        <MaterialCommunityIcons
          name={item.iconName as any}
          size={36}
          color={item.iconColor}
        />
      </View>
    );
  }
  if (item.iconFamily === "Feather") {
    return (
      <View style={circleStyle}>
        <Feather name={item.iconName as any} size={36} color={item.iconColor} />
      </View>
    );
  }
  return (
    <View style={circleStyle}>
      <Ionicons name={item.iconName as any} size={36} color={item.iconColor} />
    </View>
  );
}

function CategoryCard({ item }: { item: Category }) {
  return (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: CARD_BG }]}
      activeOpacity={0.85}
    >
      <View style={styles.categoryCardContent}>
        <Text style={styles.categoryCardTitle}>{item.title}</Text>
        <Text style={styles.categoryCardCount}>{item.taskCount} Tasks</Text>
      </View>
      <CategoryIcon item={item} />
    </TouchableOpacity>
  );
}

function ProgressBar({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress}%` as any, backgroundColor: color },
        ]}
      />
    </View>
  );
}

function OngoingTaskCard({ item }: { item: Task }) {
  return (
    <TouchableOpacity style={styles.taskCard} activeOpacity={0.85}>
      {/* Tag + Due date row */}
      <View style={styles.taskTagRow}>
        <View
          style={[styles.taskTag, { backgroundColor: item.progress.tagBg }]}
        >
          <Text
            style={[styles.taskTagText, { color: item.progress.tagColor }]}
          >
            {item.progress.tag}
          </Text>
        </View>
        <View style={styles.dueDateBadge}>
          <Feather name="clock" size={11} color="#AAAAAA" />
          <Text style={styles.dueDateText}>{item.progress.dueDate}</Text>
        </View>
      </View>

      {/* Title + description */}
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>

      {/* Progress bar */}
      <View style={styles.taskProgressRow}>
        <ProgressBar
          progress={item.progress.progress}
          color={item.progress.color}
        />
        <Text style={[styles.taskPercent, { color: item.progress.color }]}>
          {item.progress.progress}%
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.taskFooter}>
        <View style={styles.subtaskRow}>
          <Feather name="check-square" size={12} color="#BBBBBB" />
          <Text style={styles.subtaskText}>
            {item.progress.subtasks} subtasks
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            { backgroundColor: item.progress.color },
          ]}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EFE6" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ─────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Hello , Devs</Text>
            <Text style={styles.headerSubtitle}>14 tasks today</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={require("@/assets/images/person.png")}
              style={styles.avatar}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* ── SEARCH BAR ─────────────────────────── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Feather
              name="search"
              size={18}
              color="#AAAAAA"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#BBBBBB"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Image
              source={require("@/assets/images/bx_slider.png")}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* ── CATEGORIES ─────────────────────────── */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => <CategoryCard item={item} />}
          scrollEnabled
        />

        {/* ── ONGOING TASKS ──────────────────────── */}
        <Text style={[styles.sectionTitle, styles.ongoingTitle]}>
          Ongoing Task
        </Text>
        <View style={styles.tasksList}>
          {ONGOING_TASKS.map((task) => (
            <OngoingTaskCard key={task.id} item={task} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const BG = "#F5EFE6";
const CARD_BG = "#FFFFFF";
const CARD_W = 189;
const CARD_H = 192;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingBottom: 48,
  },

  // ── Header ────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerGreeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A2E",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
    fontWeight: "400",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5C6A0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 50,
    height: 50,
  },

  // ── Search ────────────────────────────────────
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    gap: 12,
    marginBottom: 26,
  },
  searchBox: {
    width: 280,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333333",
  },
  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F26522",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F26522",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  filterIcon: {
    width: 22,
    height: 22,
    tintColor: "#FFFFFF",
  },

  // ── Section titles ────────────────────────────
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A2E",
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  ongoingTitle: {
    marginTop: 28,
  },

  // ── Category cards ────────────────────────────
  categoriesList: {
    paddingLeft: 22,
    paddingRight: 10,
    gap: 14,
  },
  categoryCard: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  categoryCardContent: {
    padding: 14,
    paddingBottom: 0,
  },
  categoryCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  categoryCardCount: {
    fontSize: 12,
    color: "#777777",
    marginTop: 3,
  },
  categoryImage: {
    width: "100%",
    height: 100,
  },

  // ── Task cards ────────────────────────────────
  tasksList: {
    paddingHorizontal: 22,
    gap: 14,
  },
  taskCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  taskTagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  taskTagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  dueDateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dueDateText: {
    fontSize: 11,
    color: "#AAAAAA",
    fontWeight: "500",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 13,
    color: "#888888",
    lineHeight: 18,
    marginBottom: 14,
  },
  taskProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F0F0F0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  taskPercent: {
    fontSize: 12,
    fontWeight: "700",
    minWidth: 34,
    textAlign: "right",
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  subtaskText: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  continueBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  continueBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
