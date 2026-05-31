'use client'
import { useState, useEffect, useRef } from 'react'

type Screen = 'dashboard' | 'lessons' | 'lesson' | 'result'
type LevelKey = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

interface Word {
  german: string
  roman: string
  english: string
  urdu: string
  icon: string
}

interface Dialogue {
  prompt: string
  roman: string
  meaning: string
  userGoal: string
  userRoman: string
  slow: string
  words: string[]
}

interface Lesson {
  id: number
  title: string
  topic: string
  vocab: Word[]
  dialogues: Dialogue[]
}

interface Level {
  name: string
  color: string
  icon: string
  totalLessons: number
  lessons: Lesson[]
}

interface Curriculum {
  A1: Level
  A2: Level
  B1: Level
  B2: Level
  C1: Level
  C2: Level
}

export default function GermanApp() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>('A1')
  const [selectedLesson, setSelectedLesson] = useState<number>(0)
  const [currentDialogue, setCurrentDialogue] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [userText, setUserText] = useState<string>('')
  const [textInput, setTextInput] = useState<string>('')
  const [isListening, setIsListening] = useState<boolean>(false)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  const recognitionRef = useRef<any>(null)

  // FULL A1 CURRICULUM - 12 LESSONS COMPLETE
  const curriculum: Curriculum = {
    A1: {
      name: "Beginner",
      color: "from-green-500 to-emerald-600",
      icon: "🌱",
      totalLessons: 12,
      lessons: [
        {
          id: 1,
          title: "Greetings & Farewells",
          topic: "Daily Life",
          vocab: [
            { german: "Hallo", roman: "HA-lo", english: "Hello", urdu: "ہیلو", icon: "👋" },
            { german: "Guten", roman: "Goo-ten", english: "Good", urdu: "اچھا", icon: "👍" },
            { german: "Morgen", roman: "Mor-gen", english: "Morning", urdu: "صبح", icon: "🌅" },
            { german: "Tag", roman: "Taag", english: "Day", urdu: "دن", icon: "☀️" },
            { german: "Abend", roman: "Aa-bent", english: "Evening", urdu: "شام", icon: "🌆" },
            { german: "Nacht", roman: "Nakht", english: "Night", urdu: "رات", icon: "🌙" },
            { german: "Tschüss", roman: "Chüss", english: "Bye", urdu: "الوداع", icon: "👋" },
            { german: "Wie", roman: "Vee", english: "How", urdu: "کیسے", icon: "❓" },
            { german: "geht", roman: "gayt", english: "goes", urdu: "جاتا", icon: "→" },
            { german: "es", roman: "ess", english: "it", urdu: "یہ", icon: "•" },
            { german: "dir", roman: "deer", english: "you", urdu: "تم", icon: "👤" },
            { german: "gut", roman: "goot", english: "good", urdu: "اچھا", icon: "😊" },
            { german: "Mir", roman: "Meer", english: "To me", urdu: "مجھے", icon: "👉" }
          ],
          dialogues: [
            { prompt: "Guten Morgen!", roman: "Goo-ten Mor-gen", meaning: "Good Morning", userGoal: "Guten Morgen", userRoman: "Goo-ten Mor-gen", slow: "Goo ten Mor gen", words: ["Guten", "Morgen"] },
            { prompt: "Wie geht es dir?", roman: "Vee gayt ess deer", meaning: "How are you?", userGoal: "Mir geht es gut", userRoman: "Meer gayt ess goot", slow: "Meer gayt ess goot", words: ["Mir", "geht", "es", "gut"] },
            { prompt: "Tschüss, bis morgen!", roman: "Chüss, bis mor-gen", meaning: "Bye, see you tomorrow!", userGoal: "Tschüss!", userRoman: "Chüss", slow: "Chüss", words: ["Tschüss"] },
            { prompt: "Gute Nacht!", roman: "Goo-te Nakht", meaning: "Good Night", userGoal: "Gute Nacht", userRoman: "Goo-te Nakht", slow: "Goo te Nakht", words: ["Gute", "Nacht"] }
          ]
        },
        {
          id: 2,
          title: "Self Introduction",
          topic: "Daily Life",
          vocab: [
            { german: "Wie", roman: "Vee", english: "How", urdu: "کیسے", icon: "❓" },
            { german: "heißt", roman: "haisst", english: "called", urdu: "کہلاتا", icon: "🏷️" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "heiße", roman: "hais-se", english: "am called", urdu: "کہلاتا ہوں", icon: "🙋" },
            { german: "Woher", roman: "Vo-her", english: "Where from", urdu: "کہاں سے", icon: "📍" },
            { german: "kommst", roman: "komst", english: "come", urdu: "آتے ہو", icon: "🚶" },
            { german: "komme", roman: "kom-me", english: "come", urdu: "آتا ہوں", icon: "🏠" },
            { german: "aus", roman: "ous", english: "from", urdu: "سے", icon: "→" },
            { german: "Pakistan", roman: "Pa-kis-tan", english: "Pakistan", urdu: "پاکستان", icon: "🇵🇰" },
            { german: "Wie", roman: "Vee", english: "How", urdu: "کتنا", icon: "❓" },
            { german: "alt", roman: "alt", english: "old", urdu: "عمر", icon: "🎂" },
            { german: "bin", roman: "bin", english: "am", urdu: "ہوں", icon: "✓" },
            { german: "zwanzig", roman: "tsvan-tsig", english: "twenty", urdu: "بیس", icon: "2️⃣0️⃣" }
          ],
          dialogues: [
            { prompt: "Wie heißt du?", roman: "Vee haisst doo", meaning: "What is your name?", userGoal: "Ich heiße Ahmed", userRoman: "Ikh hais-se Ahmed", slow: "Ikh hais se Ahmed", words: ["Ich", "heiße", "Ahmed"] },
            { prompt: "Woher kommst du?", roman: "Vo-her komst doo", meaning: "Where are you from?", userGoal: "Ich komme aus Pakistan", userRoman: "Ikh kom-me ous Pakistan", slow: "Ikh kom me ous Pa kis tan", words: ["Ich", "komme", "aus", "Pakistan"] },
            { prompt: "Wie alt bist du?", roman: "Vee alt bist doo", meaning: "How old are you?", userGoal: "Ich bin zwanzig", userRoman: "Ikh bin tsvan-tsig", slow: "Ikh bin tsvan tsig", words: ["Ich", "bin", "zwanzig"] }
          ]
        },
        {
          id: 3,
          title: "Numbers 1-10",
          topic: "Basics",
          vocab: [
            { german: "eins", roman: "ains", english: "one", urdu: "ایک", icon: "1️⃣" },
            { german: "zwei", roman: "tsvai", english: "two", urdu: "دو", icon: "2️⃣" },
            { german: "drei", roman: "dry", english: "three", urdu: "تین", icon: "3️⃣" },
            { german: "vier", roman: "feer", english: "four", urdu: "چار", icon: "4️⃣" },
            { german: "fünf", roman: "fünf", english: "five", urdu: "پانچ", icon: "5️⃣" },
            { german: "sechs", roman: "zeks", english: "six", urdu: "چھ", icon: "6️⃣" },
            { german: "sieben", roman: "zee-ben", english: "seven", urdu: "سات", icon: "7️⃣" },
            { german: "acht", roman: "akht", english: "eight", urdu: "آٹھ", icon: "8️⃣" },
            { german: "neun", roman: "noyn", english: "nine", urdu: "نو", icon: "9️⃣" },
            { german: "zehn", roman: "tsayn", english: "ten", urdu: "دس", icon: "🔟" },
            { german: "Wie", roman: "Vee", english: "How many", urdu: "کتنے", icon: "❓" },
            { german: "viele", roman: "fee-le", english: "many", urdu: "زیادہ", icon: "📊" }
          ],
          dialogues: [
            { prompt: "Wie viele?", roman: "Vee fee-le", meaning: "How many?", userGoal: "Zehn", userRoman: "Tsayn", slow: "Tsayn", words: ["Zehn"] },
            { prompt: "Eins, zwei, drei", roman: "Ains, tsvai, dry", meaning: "One, two, three", userGoal: "Fünf", userRoman: "Fünf", slow: "Fünf", words: ["Fünf"] }
          ]
        },
        {
          id: 4,
          title: "Family Members",
          topic: "Daily Life",
          vocab: [
            { german: "Wer", roman: "Vair", english: "Who", urdu: "کون", icon: "❓" },
            { german: "ist", roman: "ist", english: "is", urdu: "ہے", icon: "=" },
            { german: "das", roman: "das", english: "this", urdu: "یہ", icon: "👉" },
            { german: "meine", roman: "mai-ne", english: "my", urdu: "میری", icon: "❤️" },
            { german: "Mutter", roman: "Moo-ter", english: "mother", urdu: "ماں", icon: "👩" },
            { german: "Vater", roman: "Faa-ter", english: "father", urdu: "باپ", icon: "👨" },
            { german: "Bruder", roman: "Broo-der", english: "brother", urdu: "بھائی", icon: "👦" },
            { german: "Schwester", roman: "Shvis-ter", english: "sister", urdu: "بہن", icon: "👧" },
            { german: "Hast", roman: "Hast", english: "have", urdu: "ہے", icon: "✓" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "Geschwister", roman: "Ge-shvis-ter", english: "siblings", urdu: "بہن بھائی", icon: "👨‍👩‍👧‍👦" },
            { german: "Ja", roman: "Yaa", english: "yes", urdu: "ہاں", icon: "✅" },
            { german: "einen", roman: "ai-nen", english: "one", urdu: "ایک", icon: "1️⃣" }
          ],
          dialogues: [
            { prompt: "Wer ist das?", roman: "Vair ist das", meaning: "Who is this?", userGoal: "Das ist meine Mutter", userRoman: "Das ist mai-ne Moo-ter", slow: "Das ist mai ne Moo ter", words: ["Das", "ist", "meine", "Mutter"] },
            { prompt: "Hast du Geschwister?", roman: "Hast doo Ge-shvis-ter", meaning: "Do you have siblings?", userGoal: "Ja, einen Bruder", userRoman: "Yaa, ai-nen Broo-der", slow: "Yaa ai nen Broo der", words: ["Ja", "einen", "Bruder"] }
          ]
        },
        {
          id: 5,
          title: "Colors",
          topic: "Basics",
          vocab: [
            { german: "Welche", roman: "Vel-khe", english: "Which", urdu: "کون سا", icon: "❓" },
            { german: "Farbe", roman: "Far-be", english: "color", urdu: "رنگ", icon: "🎨" },
            { german: "ist", roman: "ist", english: "is", urdu: "ہے", icon: "=" },
            { german: "das", roman: "das", english: "this", urdu: "یہ", icon: "👉" },
            { german: "rot", roman: "roht", english: "red", urdu: "لال", icon: "🔴" },
            { german: "blau", roman: "blau", english: "blue", urdu: "نیلا", icon: "🔵" },
            { german: "grün", roman: "grün", english: "green", urdu: "ہرا", icon: "🟢" },
            { german: "gelb", roman: "gelp", english: "yellow", urdu: "پیلا", icon: "🟡" },
            { german: "schwarz", roman: "shvarts", english: "black", urdu: "کالا", icon: "⚫" },
            { german: "weiß", roman: "vais", english: "white", urdu: "سفید", icon: "⚪" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "mag", roman: "maag", english: "like", urdu: "پسند", icon: "❤️" }
          ],
          dialogues: [
            { prompt: "Welche Farbe ist das?", roman: "Vel-khe Far-be ist das", meaning: "What color is this?", userGoal: "Das ist rot", userRoman: "Das ist roht", slow: "Das ist roht", words: ["Das", "ist", "rot"] },
            { prompt: "Ich mag blau", roman: "Ikh maag blau", meaning: "I like blue", userGoal: "Blau ist schön", userRoman: "Blau ist shörn", slow: "Blau ist shörn", words: ["Blau", "ist", "schön"] }
          ]
        },
        {
          id: 6,
          title: "Days & Time",
          topic: "Daily Life",
          vocab: [
            { german: "Welcher", roman: "Vel-kher", english: "Which", urdu: "کون سا", icon: "❓" },
            { german: "Tag", roman: "Taag", english: "day", urdu: "دن", icon: "📅" },
            { german: "heute", roman: "hoy-te", english: "today", urdu: "آج", icon: "📆" },
            { german: "Montag", roman: "Mon-taag", english: "Monday", urdu: "پیر", icon: "1️⃣" },
            { german: "Dienstag", roman: "Deens-taag", english: "Tuesday", urdu: "منگل", icon: "2️⃣" },
            { german: "Mittwoch", roman: "Mit-vokh", english: "Wednesday", urdu: "بدھ", icon: "3️⃣" },
            { german: "Donnerstag", roman: "Don-ers-taag", english: "Thursday", urdu: "جمعرات", icon: "4️⃣" },
            { german: "Freitag", roman: "Fry-taag", english: "Friday", urdu: "جمعہ", icon: "5️⃣" },
            { german: "Samstag", roman: "Zams-taag", english: "Saturday", urdu: "ہفتہ", icon: "6️⃣" },
            { german: "Sonntag", roman: "Zon-taag", english: "Sunday", urdu: "اتوار", icon: "7️⃣" },
            { german: "Wir", roman: "Veer", english: "We", urdu: "ہم", icon: "👥" },
            { german: "treffen", roman: "tref-fen", english: "meet", urdu: "ملتے", icon: "🤝" },
            { german: "uns", roman: "uns", english: "us", urdu: "ہم", icon: "👥" },
            { german: "am", roman: "am", english: "on", urdu: "کو", icon: "📅" }
          ],
          dialogues: [
            { prompt: "Welcher Tag ist heute?", roman: "Vel-kher Taag ist hoy-te", meaning: "What day is today?", userGoal: "Heute ist Montag", userRoman: "Hoy-te ist Mon-taag", slow: "Hoy te ist Mon taag", words: ["Heute", "ist", "Montag"] },
            { prompt: "Wir treffen uns am Freitag", roman: "Veer tref-fen uns am Fry-taag", meaning: "We meet on Friday", userGoal: "Am Freitag", userRoman: "Am Fry-taag", slow: "Am Fry taag", words: ["Am", "Freitag"] }
          ]
        },
        {
          id: 7,
          title: "Food & Drink",
          topic: "Daily Life",
          vocab: [
            { german: "Möchtest", roman: "Mör-khest", english: "Would you like", urdu: "کیا آپ چاہیں گے", icon: "❓" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "Wasser", roman: "VAS-ser", english: "water", urdu: "پانی", icon: "💧" },
            { german: "Ja", roman: "Yaa", english: "yes", urdu: "ہاں", icon: "✅" },
            { german: "bitte", roman: "BIT-te", english: "please", urdu: "مہربانی", icon: "🙏" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "esse", roman: "es-se", english: "eat", urdu: "کھاتا ہوں", icon: "🍽️" },
            { german: "Brot", roman: "Brot", english: "bread", urdu: "روٹی", icon: "🍞" },
            { german: "ist", roman: "ist", english: "is", urdu: "ہے", icon: "=" },
            { german: "lecker", roman: "lek-ker", english: "delicious", urdu: "مزیدار", icon: "😋" }
          ],
          dialogues: [
            { prompt: "Möchtest du Wasser?", roman: "Mör-khest doo VAS-ser", meaning: "Do you want water?", userGoal: "Ja, Wasser bitte", userRoman: "Yaa, VAS-ser BIT-te", slow: "Yaa VAS ser BIT te", words: ["Ja", "Wasser", "bitte"] },
            { prompt: "Ich esse Brot", roman: "Ikh es-se Brot", meaning: "I eat bread", userGoal: "Brot ist lecker", userRoman: "Brot ist lek-ker", slow: "Brot ist lek ker", words: ["Brot", "ist", "lecker"] }
          ]
        },
        {
          id: 8,
          title: "House & Rooms",
          topic: "Daily Life",
          vocab: [
            { german: "Wo", roman: "Vo", english: "Where", urdu: "کہاں", icon: "📍" },
            { german: "ist", roman: "ist", english: "is", urdu: "ہے", icon: "=" },
            { german: "die", roman: "dee", english: "the", urdu: "کا", icon: "•" },
            { german: "Küche", roman: "Kü-khe", english: "kitchen", urdu: "کچن", icon: "🍳" },
            { german: "dort", roman: "dort", english: "there", urdu: "وہاں", icon: "👉" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "schlafe", roman: "shlaa-fe", english: "sleep", urdu: "سوتا ہوں", icon: "😴" },
            { german: "im", roman: "im", english: "in the", urdu: "میں", icon: "🏠" },
            { german: "Bett", roman: "Bet", english: "bed", urdu: "بستر", icon: "🛏️" },
            { german: "mein", roman: "main", english: "my", urdu: "میرا", icon: "❤️" },
            { german: "groß", roman: "grohs", english: "big", urdu: "بڑا", icon: "📏" }
          ],
          dialogues: [
            { prompt: "Wo ist die Küche?", roman: "Vo ist dee Kü-khe", meaning: "Where is the kitchen?", userGoal: "Die Küche ist dort", userRoman: "Dee Kü-khe ist dort", slow: "Dee Kü khe ist dort", words: ["Die", "Küche", "ist", "dort"] },
            { prompt: "Ich schlafe im Bett", roman: "Ikh shlaa-fe im Bet", meaning: "I sleep in bed", userGoal: "Mein Bett ist groß", userRoman: "Main Bet ist grohs", slow: "Main Bet ist grohs", words: ["Mein", "Bett", "ist", "groß"] }
          ]
        },
        {
          id: 9,
          title: "Body Parts",
          topic: "Basics",
          vocab: [
            { german: "Das", roman: "Das", english: "This", urdu: "یہ", icon: "👉" },
            { german: "mein", roman: "main", english: "my", urdu: "میرا", icon: "❤️" },
            { german: "Kopf", roman: "Kopf", english: "head", urdu: "سر", icon: "🧠" },
            { german: "tut", roman: "toot", english: "hurts", urdu: "درد", icon: "😣" },
            { german: "weh", roman: "vay", english: "pain", urdu: "ہو رہا", icon: "⚡" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "habe", roman: "haa-be", english: "have", urdu: "ہیں", icon: "✓" },
            { german: "zwei", roman: "tsvai", english: "two", urdu: "دو", icon: "2️⃣" },
            { german: "Hände", roman: "Hen-de", english: "hands", urdu: "ہاتھ", icon: "✋" },
            { german: "sauber", roman: "zow-ber", english: "clean", urdu: "صاف", icon: "🧼" }
          ],
          dialogues: [
            { prompt: "Das ist mein Kopf", roman: "Das ist main Kopf", meaning: "This is my head", userGoal: "Mein Kopf tut weh", userRoman: "Main Kopf toot vay", slow: "Main Kopf toot vay", words: ["Mein", "Kopf", "tut", "weh"] },
            { prompt: "Ich habe zwei Hände", roman: "Ikh haa-be tsvai Hen-de", meaning: "I have two hands", userGoal: "Meine Hände sind sauber", userRoman: "Mai-ne Hen-de zint zow-ber", slow: "Mai ne Hen de zint zow ber", words: ["Meine", "Hände", "sind", "sauber"] }
          ]
        },
        {
          id: 10,
          title: "Professions",
          topic: "Daily Life",
          vocab: [
            { german: "Was", roman: "Vas", english: "What", urdu: "کیا", icon: "❓" },
            { german: "bist", roman: "bist", english: "are", urdu: "ہو", icon: "=" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "von", roman: "fon", english: "by", urdu: "کے لحاظ سے", icon: "→" },
            { german: "Beruf", roman: "Ber-oof", english: "profession", urdu: "پیشہ", icon: "💼" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "bin", roman: "bin", english: "am", urdu: "ہوں", icon: "=" },
            { german: "Lehrer", roman: "Lay-rer", english: "teacher", urdu: "استاد", icon: "👨‍🏫" },
            { german: "mein", roman: "main", english: "my", urdu: "میرا", icon: "❤️" },
            { german: "Vater", roman: "Faa-ter", english: "father", urdu: "باپ", icon: "👨" },
            { german: "Arzt", roman: "Arts-t", english: "doctor", urdu: "ڈاکٹر", icon: "👨‍⚕️" },
            { german: "hilft", roman: "hil-ft", english: "helps", urdu: "مدد کرتا", icon: "🤝" },
            { german: "Menschen", roman: "Men-shen", english: "people", urdu: "لوگ", icon: "👥" }
          ],
          dialogues: [
            { prompt: "Was bist du von Beruf?", roman: "Vas bist doo fon Ber-oof", meaning: "What is your profession?", userGoal: "Ich bin Lehrer", userRoman: "Ikh bin Lay-rer", slow: "Ikh bin Lay rer", words: ["Ich", "bin", "Lehrer"] },
            { prompt: "Mein Vater ist Arzt", roman: "Main Faa-ter ist Arts-t", meaning: "My father is doctor", userGoal: "Arzt hilft Menschen", userRoman: "Arts-t hil-ft Men-shen", slow: "Arts t hil ft Men shen", words: ["Arzt", "hilft", "Menschen"] }
          ]
        },
        {
          id: 11,
          title: "Shopping",
          topic: "Daily Life",
          vocab: [
            { german: "Wie", roman: "Vee", english: "How", urdu: "کتنا", icon: "❓" },
            { german: "viel", roman: "feel", english: "much", urdu: "زیادہ", icon: "💰" },
            { german: "kostet", roman: "kos-tet", english: "cost", urdu: "قیمت", icon: "🏷️" },
            { german: "das", roman: "das", english: "this", urdu: "یہ", icon: "👉" },
            { german: "Es", roman: "Ess", english: "It", urdu: "یہ", icon: "•" },
            { german: "Euro", roman: "Oy-ro", english: "Euro", urdu: "یورو", icon: "💶" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "möchte", roman: "mör-kh-te", english: "want", urdu: "چاہتا ہوں", icon: "🛒" },
            { german: "kaufen", roman: "kow-fen", english: "buy", urdu: "خریدنا", icon: "💳" },
            { german: "zu", roman: "tsoo", english: "too", urdu: "بہت", icon: "📈" },
            { german: "teuer", roman: "toy-er", english: "expensive", urdu: "مہنگا", icon: "💸" }
          ],
          dialogues: [
            { prompt: "Wie viel kostet das?", roman: "Vee feel kos-tet das", meaning: "How much does it cost?", userGoal: "Es kostet fünf Euro", userRoman: "Ess kos-tet fünf Oy-ro", slow: "Ess kos tet fünf Oy ro", words: ["Es", "kostet", "fünf", "Euro"] },
            { prompt: "Ich möchte das kaufen", roman: "Ikh mör-kh-te das kow-fen", meaning: "I want to buy this", userGoal: "Das ist zu teuer", userRoman: "Das ist tsoo toy-er", slow: "Das ist tsoo toy er", words: ["Das", "ist", "zu", "teuer"] }
          ]
        },
        {
          id: 12,
          title: "W-Questions",
          topic: "Grammar",
          vocab: [
            { german: "Wer", roman: "Vair", english: "Who", urdu: "کون", icon: "❓" },
            { german: "bist", roman: "bist", english: "are", urdu: "ہو", icon: "=" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "Ahmed", roman: "Ah-med", english: "Ahmed", urdu: "احمد", icon: "🙋" },
            { german: "Wo", roman: "Vo", english: "Where", urdu: "کہاں", icon: "📍" },
            { german: "wohnst", roman: "voonst", english: "live", urdu: "رہتے ہو", icon: "🏠" },
            { german: "wohne", roman: "vo-ne", english: "live", urdu: "رہتا ہوں", icon: "🏡" },
            { german: "hier", roman: "heer", english: "here", urdu: "یہاں", icon: "📍" },
            { german: "Warum", roman: "Va-room", english: "Why", urdu: "کیوں", icon: "❓" },
            { german: "lernst", roman: "lernst", english: "learn", urdu: "سیکھتے ہو", icon: "📚" },
            { german: "Deutsch", roman: "Doytsh", english: "German", urdu: "جرمن", icon: "🇩🇪" },
            { german: "für", roman: "für", english: "for", urdu: "کے لیے", icon: "→" },
            { german: "Arbeit", roman: "Ar-bait", english: "work", urdu: "کام", icon: "💼" }
          ],
          dialogues: [
            { prompt: "Wer bist du?", roman: "Vair bist doo", meaning: "Who are you?", userGoal: "Ich bin Ahmed", userRoman: "Ikh bin Ahmed", slow: "Ikh bin Ahmed", words: ["Ich", "bin", "Ahmed"] },
            { prompt: "Wo wohnst du?", roman: "Vo voonst doo", meaning: "Where do you live?", userGoal: "Ich wohne hier", userRoman: "Ikh vo-ne heer", slow: "Ikh vo ne heer", words: ["Ich", "wohne", "hier"] },
            { prompt: "Warum lernst du Deutsch?", roman: "Va-room lernst doo Doytsh", meaning: "Why do you learn German?", userGoal: "Für die Arbeit", userRoman: "Für dee Ar-bait", slow: "Für dee Ar bait", words: ["Für", "die", "Arbeit"] }
          ]
        }
      ]
    },
A2: {
      name: "Elementary",
      color: "from-blue-500 to-cyan-600",
      icon: "🌿",
      totalLessons: 3,
      lessons: [
        {
          id: 1,
          title: "Daily Routine",
          topic: "Daily Life",
          vocab: [
            { german: "Wann", roman: "Van", english: "When", urdu: "کب", icon: "⏰" },
            { german: "stehst", roman: "shtayst", english: "stand", urdu: "کھڑے", icon: "🧍" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "auf", roman: "ouf", english: "up", urdu: "اٹھنا", icon: "⬆️" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "stehe", roman: "shtay", english: "stand", urdu: "کھڑا ہوتا", icon: "🧍" },
            { german: "um", roman: "um", english: "at", urdu: "بجے", icon: "🕐" },
            { german: "sieben", roman: "zee-ben", english: "seven", urdu: "سات", icon: "7️⃣" },
            { german: "Uhr", roman: "oor", english: "o'clock", urdu: "بجے", icon: "🕐" }
          ],
          dialogues: [
            { prompt: "Wann stehst du auf?", roman: "Van shtayst doo ouf", meaning: "When do you wake up?", userGoal: "Ich stehe um sieben Uhr auf", userRoman: "Ikh shtay um zee-ben oor ouf", slow: "Ikh shtay um zee ben oor ouf", words: ["Ich", "stehe", "um", "sieben", "Uhr", "auf"] }
          ]
        },
        {
          id: 2,
          title: "Past Tense Perfekt",
          topic: "Grammar",
          vocab: [
            { german: "Was", roman: "Vas", english: "What", urdu: "کیا", icon: "❓" },
            { german: "hast", roman: "hast", english: "have", urdu: "کیا", icon: "✓" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "gestern", roman: "ges-tern", english: "yesterday", urdu: "کل", icon: "📅" },
            { german: "gemacht", roman: "ge-makht", english: "done", urdu: "کیا", icon: "✅" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "habe", roman: "haa-be", english: "have", urdu: "کیا", icon: "✓" },
            { german: "geschlafen", roman: "ge-shlaa-fen", english: "slept", urdu: "سویا", icon: "😴" }
          ],
          dialogues: [
            { prompt: "Was hast du gestern gemacht?", roman: "Vas hast doo ges-tern ge-makht", meaning: "What did you do yesterday?", userGoal: "Ich habe geschlafen", userRoman: "Ikh haa-be ge-shlaa-fen", slow: "Ikh haa be ge shlaa fen", words: ["Ich", "habe", "geschlafen"] }
          ]
        },
        {
          id: 3,
          title: "Modal Verbs",
          topic: "Grammar",
          vocab: [
            { german: "Kannst", roman: "Kanst", english: "can", urdu: "سکتے ہو", icon: "💪" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "Deutsch", roman: "Doytsh", english: "German", urdu: "جرمن", icon: "🇩🇪" },
            { german: "sprechen", roman: "shpre-khen", english: "speak", urdu: "بولنا", icon: "🗣️" },
            { german: "Ja", roman: "Yaa", english: "yes", urdu: "ہاں", icon: "✅" },
            { german: "ich", roman: "ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "kann", roman: "kan", english: "can", urdu: "سکتا ہوں", icon: "💪" },
            { german: "sprechen", roman: "shpre-khen", english: "speak", urdu: "بولنا", icon: "🗣️" },
            { german: "muss", roman: "mus", english: "must", urdu: "لازمی", icon: "⚠️" },
            { german: "arbeiten", roman: "ar-bai-ten", english: "work", urdu: "کام کرنا", icon: "💼" },
            { german: "will", roman: "vil", english: "want", urdu: "چاہتا ہوں", icon: "❤️" },
            { german: "schlafen", roman: "shlaa-fen", english: "sleep", urdu: "سونا", icon: "😴" }
          ],
          dialogues: [
            { prompt: "Kannst du Deutsch sprechen?", roman: "Kanst doo Doytsh shpre-khen", meaning: "Can you speak German?", userGoal: "Ja, ich kann sprechen", userRoman: "Yaa, ikh kan shpre-khen", slow: "Yaa ikh kan shpre khen", words: ["Ja", "ich", "kann", "sprechen"] },
            { prompt: "Ich muss arbeiten", roman: "Ikh mus ar-bai-ten", meaning: "I must work", userGoal: "Ich will schlafen", userRoman: "Ikh vil shlaa-fen", slow: "Ikh vil shlaa fen", words: ["Ich", "will", "schlafen"] }
          ]
        }
      ]
    },
    B1: {
      name: "Intermediate",
      color: "from-orange-500 to-red-600",
      icon: "🌳",
      totalLessons: 3,
      lessons: [
        {
          id: 1,
          title: "Past Tense Präteritum",
          topic: "Grammar",
          vocab: [
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "war", roman: "vaar", english: "was", urdu: "تھا", icon: "⏰" },
            { german: "gestern", roman: "ges-tern", english: "yesterday", urdu: "کل", icon: "📅" },
            { german: "krank", roman: "krank", english: "sick", urdu: "بیمار", icon: "🤒" },
            { german: "Es", roman: "Ess", english: "It", urdu: "یہ", icon: "•" },
            { german: "war", roman: "vaar", english: "was", urdu: "تھا", icon: "⏰" },
            { german: "langweilig", roman: "lang-vai-lig", english: "boring", urdu: "بورنگ", icon: "😴" }
          ],
          dialogues: [
            { prompt: "Ich war gestern krank", roman: "Ikh vaar ges-tern krank", meaning: "I was sick yesterday", userGoal: "Es war langweilig", userRoman: "Ess vaar lang-vai-lig", slow: "Ess vaar lang vai lig", words: ["Es", "war", "langweilig"] }
          ]
        },
        {
          id: 2,
          title: "Future Tense",
          topic: "Grammar",
          vocab: [
            { german: "Was", roman: "Vas", english: "What", urdu: "کیا", icon: "❓" },
            { german: "wirst", roman: "virst", english: "will", urdu: "کرو گے", icon: "🔮" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "morgen", roman: "mor-gen", english: "tomorrow", urdu: "کل", icon: "📅" },
            { german: "machen", roman: "makh-en", english: "do", urdu: "کرنا", icon: "✅" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "werde", roman: "ver-de", english: "will", urdu: "کروں گا", icon: "🔮" },
            { german: "arbeiten", roman: "ar-bai-ten", english: "work", urdu: "کام کرنا", icon: "💼" }
          ],
          dialogues: [
            { prompt: "Was wirst du morgen machen?", roman: "Vas virst doo mor-gen makh-en", meaning: "What will you do tomorrow?", userGoal: "Ich werde arbeiten", userRoman: "Ikh ver-de ar-bai-ten", slow: "Ikh ver de ar bai ten", words: ["Ich", "werde", "arbeiten"] }
          ]
        },
        {
          id: 3,
          title: "Travel Experience",
          topic: "Travel",
          vocab: [
            { german: "Warst", roman: "Varst", english: "were", urdu: "تھے", icon: "⏰" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "schon", roman: "shon", english: "already", urdu: "پہلے", icon: "✓" },
            { german: "in", roman: "in", english: "in", urdu: "میں", icon: "📍" },
            { german: "Berlin", roman: "Ber-lin", english: "Berlin", urdu: "برلن", icon: "🏛️" },
            { german: "Ja", roman: "Yaa", english: "yes", urdu: "ہاں", icon: "✅" },
            { german: "letztes", roman: "lets-tes", english: "last", urdu: "پچھلا", icon: "⏮️" },
            { german: "Jahr", roman: "Yaar", english: "year", urdu: "سال", icon: "📆" }
          ],
          dialogues: [
            { prompt: "Warst du schon in Berlin?", roman: "Varst doo shon in Ber-lin", meaning: "Have you been to Berlin?", userGoal: "Ja, letztes Jahr", userRoman: "Yaa, lets-tes Yaar", slow: "Yaa lets tes Yaar", words: ["Ja", "letztes", "Jahr"] }
          ]
        }
      ]
    },
    B2: {
      name: "Advanced",
      color: "from-purple-500 to-pink-600",
      icon: "🌲",
      totalLessons: 3,
      lessons: [
        {
          id: 1,
          title: "Konjunktiv II",
          topic: "Grammar",
          vocab: [
            { german: "Was", roman: "Vas", english: "What", urdu: "کیا", icon: "❓" },
            { german: "würdest", roman: "vür-dest", english: "would", urdu: "کرو گے", icon: "💭" },
            { german: "du", roman: "doo", english: "you", urdu: "تم", icon: "👤" },
            { german: "tun", roman: "toon", english: "do", urdu: "کرنا", icon: "✅" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "würde", roman: "vür-de", english: "would", urdu: "کروں گا", icon: "💭" },
            { german: "reisen", roman: "rai-zen", english: "travel", urdu: "سفر کرنا", icon: "✈️" }
          ],
          dialogues: [
            { prompt: "Was würdest du tun?", roman: "Vas vür-dest doo toon", meaning: "What would you do?", userGoal: "Ich würde reisen", userRoman: "Ikh vür-de rai-zen", slow: "Ikh vür de rai zen", words: ["Ich", "würde", "reisen"] }
          ]
        },
        {
          id: 2,
          title: "Passive Voice",
          topic: "Grammar",
          vocab: [
            { german: "Das", roman: "Das", english: "The", urdu: "یہ", icon: "👉" },
            { german: "Haus", roman: "Howz", english: "house", urdu: "گھر", icon: "🏠" },
            { german: "wird", roman: "virt", english: "is", urdu: "ہے", icon: "=" },
            { german: "gebaut", roman: "ge-bowt", english: "built", urdu: "بنایا جا رہا", icon: "🔨" },
            { german: "Das", roman: "Das", english: "The", urdu: "یہ", icon: "👉" },
            { german: "Buch", roman: "Bukh", english: "book", urdu: "کتاب", icon: "📖" },
            { german: "wurde", roman: "vur-de", english: "was", urdu: "تھی", icon: "⏰" },
            { german: "gelesen", roman: "ge-lay-zen", english: "read", urdu: "پڑھی", icon: "📚" }
          ],
          dialogues: [
            { prompt: "Das Haus wird gebaut", roman: "Das Howz virt ge-bowt", meaning: "The house is being built", userGoal: "Das Buch wurde gelesen", userRoman: "Das Bukh vur-de ge-lay-zen", slow: "Das Bukh vur de ge lay zen", words: ["Das", "Buch", "wurde", "gelesen"] }
          ]
        },
        {
          id: 3,
          title: "Debate",
          topic: "General",
          vocab: [
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "bin", roman: "bin", english: "am", urdu: "ہوں", icon: "=" },
            { german: "der", roman: "dair", english: "the", urdu: "کا", icon: "•" },
            { german: "Meinung", roman: "Mai-nung", english: "opinion", urdu: "رائے", icon: "💭" },
            { german: "dass", roman: "das", english: "that", urdu: "کہ", icon: "→" },
            { german: "Das", roman: "Das", english: "That", urdu: "یہ", icon: "👉" },
            { german: "stimmt", roman: "shtimt", english: "is correct", urdu: "صحیح ہے", icon: "✅" },
            { german: "nicht", roman: "nikht", english: "not", urdu: "نہیں", icon: "❌" }
          ],
          dialogues: [
            { prompt: "Ich bin der Meinung, dass...", roman: "Ikh bin dair Mai-nung, das", meaning: "I am of the opinion that...", userGoal: "Das stimmt nicht", userRoman: "Das shtimt nikht", slow: "Das shtimt nikht", words: ["Das", "stimmt", "nicht"] }
          ]
        }
      ]
    },
    C1: {
      name: "Proficient",
      color: "from-indigo-600 to-purple-700",
      icon: "📚",
      totalLessons: 3,
      lessons: [
        {
          id: 1,
          title: "Academic German",
          topic: "Academic",
          vocab: [
            { german: "Können", roman: "Kö-nen", english: "Can", urdu: "کیا", icon: "❓" },
            { german: "Sie", roman: "zee", english: "you", urdu: "آپ", icon: "👤" },
            { german: "das", roman: "das", english: "this", urdu: "یہ", icon: "👉" },
            { german: "erläutern", roman: "er-loy-tern", english: "explain", urdu: "وضاحت کرنا", icon: "💡" },
            { german: "Das", roman: "Das", english: "This", urdu: "یہ", icon: "👉" },
            { german: "bedeutet", roman: "be-doy-tet", english: "means", urdu: "مطلب ہے", icon: "📝" }
          ],
          dialogues: [
            { prompt: "Können Sie das erläutern?", roman: "Kö-nen zee das er-loy-tern", meaning: "Can you explain that?", userGoal: "Das bedeutet...", userRoman: "Das be-doy-tet", slow: "Das be doy tet", words: ["Das", "bedeutet"] }
          ]
        },
        {
          id: 2,
          title: "Research Papers",
          topic: "Academic",
          vocab: [
            { german: "Die", roman: "Dee", english: "The", urdu: "یہ", icon: "👉" },
            { german: "Studie", roman: "Shtoo-die", english: "study", urdu: "مطالعہ", icon: "📊" },
            { german: "zeigt", roman: "tsaigt", english: "shows", urdu: "دکھاتی ہے", icon: "📈" },
            { german: "dass", roman: "das", english: "that", urdu: "کہ", icon: "→" },
            { german: "Die", roman: "Dee", english: "The", urdu: "یہ", icon: "👉" },
            { german: "Ergebnisse", roman: "Er-geb-nis-se", english: "results", urdu: "نتائج", icon: "📊" },
            { german: "beweisen", roman: "be-vai-zen", english: "prove", urdu: "ثابت کرتے ہیں", icon: "✓" }
          ],
          dialogues: [
            { prompt: "Die Studie zeigt, dass...", roman: "Dee Shtoo-die tsaigt, das", meaning: "The study shows that...", userGoal: "Die Ergebnisse beweisen", userRoman: "Dee Er-geb-nis-se be-vai-zen", slow: "Dee Er geb nis se be vai zen", words: ["Die", "Ergebnisse", "beweisen"] }
          ]
        },
        {
          id: 3,
          title: "Conference Presentation",
          topic: "Academic",
          vocab: [
            { german: "Meine", roman: "Mai-ne", english: "My", urdu: "میری", icon: "👉" },
            { german: "Damen", roman: "Daa-men", english: "ladies", urdu: "خواتین", icon: "👩" },
            { german: "und", roman: "unt", english: "and", urdu: "اور", icon: "+" },
            { german: "Herren", roman: "Her-ren", english: "gentlemen", urdu: "حضرات", icon: "👨" },
            { german: "ich", roman: "ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "präsentiere", roman: "prä-zen-tie-re", english: "present", urdu: "پیش کرتا ہوں", icon: "📊" },
            { german: "Wie", roman: "Vee", english: "How", urdu: "کیسے", icon: "❓" },
            { german: "Sie", roman: "zee", english: "you", urdu: "آپ", icon: "👤" },
            { german: "sehen", roman: "zay-en", english: "see", urdu: "دیکھ سکتے", icon: "👁️" },
            { german: "können", roman: "kö-nen", english: "can", urdu: "سکتے ہیں", icon: "💪" },
            { german: "Gibt", roman: "Gib-t", english: "Are there", urdu: "کیا ہیں", icon: "❓" },
            { german: "Fragen", roman: "Fraa-gen", english: "questions", urdu: "سوالات", icon: "❓" },
            { german: "Ich", roman: "Ikh", english: "I", urdu: "میں", icon: "👉" },
            { german: "habe", roman: "haa-be", english: "have", urdu: "ہے", icon: "✓" },
            { german: "eine", roman: "ai-ne", english: "a", urdu: "ایک", icon: "1️⃣" },
            { german: "Frage", roman: "Fraa-ge", english: "question", urdu: "سوال", icon: "❓" }
          ],
          dialogues: [
            { prompt: "Meine Damen und Herren, ich präsentiere...", roman: "Mai-ne Daa-men unt Her-ren, ikh prä-zen-tie-re", meaning: "Ladies and gentlemen, I present...", userGoal: "Wie Sie sehen können", userRoman: "Vee zee zay-en kö-nen", slow: "Vee zee zay en kö nen", words: ["Wie", "Sie", "sehen", "können"] },
            { prompt: "Gibt es Fragen?", roman: "Gib-t ess Fraa-gen", meaning: "Any questions?", userGoal: "Ich habe eine Frage", userRoman: "Ikh haa-be ai-ne Fraa-ge", slow: "Ikh haa be ai ne Fraa ge", words: ["Ich", "habe", "eine", "Frage"] }
          ]
        }
      ]
    },
   C2: {
      name: "Mastery",
      color: "from-gray-800 to-black",
      icon: "👑",
      totalLessons: 3,
      lessons: [
        {
          id: 1,
          title: "Idioms & Expressions",
          topic: "Native",
          vocab: [
            { german: "Das", roman: "Das", english: "That", urdu: "یہ", icon: "👉" },
            { german: "ist", roman: "ist", english: "is", urdu: "ہے", icon: "=" },
            { german: "mir", roman: "meer", english: "to me", urdu: "مجھے", icon: "👉" },
            { german: "Wurst", roman: "wurst", english: "sausage", urdu: "پرواہ نہیں", icon: "🌭" },
            { german: "Mir", roman: "Meer", english: "To me", urdu: "مجھے", icon: "👉" },
            { german: "egal", roman: "ay-gal", english: "equal", urdu: "فرق نہیں پڑتا", icon: "😐" }
          ],
          dialogues: [
            { prompt: "Das ist mir Wurst", roman: "Das ist meer wurst", meaning: "I don't care", userGoal: "Mir ist das egal", userRoman: "Meer ist das ay-gal", slow: "Meer ist das ay gal", words: ["Mir", "ist", "das", "egal"] }
          ]
        }
      ]
    }
  }

  const currentLevelData = curriculum[selectedLevel]
  const currentLessonData = currentLevelData?.lessons[selectedLesson]
  const currentDialogueData = currentLessonData?.dialogues[currentDialogue]

  // TTS - IMPROVED
  const speak = (text: string, speed: number = 0.9) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      const msg = new SpeechSynthesisUtterance(text)
      msg.lang = 'de-DE'
      msg.rate = speed
      msg.pitch = 1.0
      const voices = speechSynthesis.getVoices()
      const germanVoice = voices.find(v => v.lang.startsWith('de') && v.name.includes('Google'))
      if (germanVoice) msg.voice = germanVoice
      else {
        const fallbackVoice = voices.find(v => v.lang.startsWith('de'))
        if (fallbackVoice) msg.voice = fallbackVoice
      }
      speechSynthesis.speak(msg)
    }
  }

  // JAB WORD TAP KARO TO SENTENCE BOLO
  const toggleWord = (word: string) => {
    let newWords: string[]
    if (selectedWords.includes(word)) {
      newWords = selectedWords.filter(w => w!== word)
    } else {
      newWords = [...selectedWords, word]
    }
    setSelectedWords(newWords)

    // NAYA: Jitne words jode utni der me sentence bolo
    if (newWords.length > 0) {
      const sentence = newWords.join(' ')
      setTimeout(() => speak(sentence, 0.85), 200)
    }
  }

  const playBuiltSentence = () => {
    if (selectedWords.length > 0) {
      const sentence = selectedWords.join(' ')
      speak(sentence, 0.9)
    }
  }

  const clearWords = () => {
    setSelectedWords([])
  }

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.lang = 'de-DE'
      recognition.interimResults = false
      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setUserText(transcript)
        checkAnswer(transcript)
      }
      recognitionRef.current = recognition
    }
  }, [currentDialogue])

  const startListening = () => {
    setUserText('')
    recognitionRef.current?.start()
  }

  const handleSubmit = () => {
    const builtSentence = selectedWords.join(' ')
    const correctSentence = currentDialogueData.userGoal

    if (builtSentence === correctSentence) {
      setTimeout(() => nextDialogue(), 500)
      return
    }

    if (textInput.trim()) {
      checkAnswer(textInput)
      setTextInput('')
      setSelectedWords([])
      return
    }

    if (userText) {
      checkAnswer(userText)
      setSelectedWords([])
      return
    }

    setShowAnswer(true)
    setTimeout(() => nextDialogue(), 1500)
  }

  const checkAnswer = (user: string) => {
    if (!currentDialogueData) return
    const userClean = user.toLowerCase().replace(/[^a-zäöüß\s]/g, '').trim()
    const goalClean = currentDialogueData.userGoal.toLowerCase().replace(/[^a-zäöüß\s]/g, '').trim()

    if (userClean === goalClean) {
      setTimeout(() => nextDialogue(), 500)
    } else {
      setShowAnswer(true)
      setTimeout(() => nextDialogue(), 1500)
    }
  }

  const nextDialogue = () => {
    if (!currentLessonData) return
    setShowAnswer(false)
    setSelectedWords([])
    setUserText('')
    if (currentDialogue < currentLessonData.dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1)
      setTimeout(() => speak(currentLessonData.dialogues[currentDialogue + 1].prompt), 500)
    } else {
      const lessonKey = `${selectedLevel}-${currentLessonData.id}`
      if (!completedLessons.includes(lessonKey)) {
        setCompletedLessons([...completedLessons, lessonKey])
        setStreak(streak + 1)
      }
      setScreen('result')
    }
  }

  const startLesson = (level: LevelKey, lessonIdx: number) => {
    setSelectedLevel(level)
    setSelectedLesson(lessonIdx)
    setCurrentDialogue(0)
    setSelectedWords([])
    setUserText('')
    setTextInput('')
    setScreen('lesson')
    setTimeout(() => speak(curriculum[level].lessons[lessonIdx].dialogues[0].prompt), 500)
  }

  // DASHBOARD
  if (screen === 'dashboard') {
    const levels: LevelKey[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur rounded-3xl p-6 mb-8 text-center">
            <h1 className="text-3xl font-black mb-2">German Learning App</h1>
            <p className="text-gray-400">Learn by Building & Speaking</p>
            <div className="text-lg mt-4">Streak: {streak} 🔥</div>
          </div>
          <h2 className="text-2xl font-bold mb-6">Choose Your Level:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {levels.map((level) => {
              const data = curriculum[level]
              const completedCount = data.lessons.filter((l: Lesson) =>
                completedLessons.includes(`${level}-${l.id}`)
              ).length
              const progress = data.lessons.length > 0? (completedCount / data.lessons.length) * 100 : 0
              return (
                <div key={level} className={`bg-gradient-to-br ${data.color} p-6 rounded-3xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{data.icon}</div>
                      <div>
                        <div className="text-3xl font-black">{level}</div>
                        <div className="text-sm opacity-80">{data.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{completedCount}/{data.lessons.length}</div>
                      <div className="text-xs opacity-80">Lessons</div>
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-full h-2 mb-4 overflow-hidden">
                    <div className="bg-white h-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <button onClick={() => { setSelectedLevel(level); setScreen('lessons') }}
                    className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition">
                    Open Lessons →
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // LESSONS LIST
  if (screen === 'lessons') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setScreen('dashboard')} className="text-2xl mb-6">← Back</button>
          <div className={`bg-gradient-to-r ${currentLevelData.color} p-6 rounded-3xl mb-6`}>
            <div className="text-6xl mb-2">{currentLevelData.icon}</div>
            <h1 className="text-3xl font-black">Level {selectedLevel}</h1>
            <p className="opacity-80">{currentLevelData.name}</p>
          </div>
          <h2 className="text-xl font-bold mb-4">All Lessons:</h2>
          {currentLevelData.lessons.map((lesson: Lesson, idx: number) => {
            const isCompleted = completedLessons.includes(`${selectedLevel}-${lesson.id}`)
            return (
              <button key={lesson.id} onClick={() => startLesson(selectedLevel, idx)}
                className="w-full bg-white/5 hover:bg-white/10 p-5 rounded-2xl mb-3 text-left transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{isCompleted? '✅' : `${idx + 1}`}</div>
                    <div>
                      <div className="font-bold text-lg">{lesson.title}</div>
                      <div className="text-sm text-gray-400">{lesson.topic} • {lesson.vocab.length} words</div>
                    </div>
                  </div>
                  <div className="text-2xl">→</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // RESULT
  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-3xl font-black text-green-600 mb-2">Lesson Complete!</h1>
          <p className="text-gray-600 mb-4">Great job! Keep learning</p>
          <button onClick={() => setScreen('lessons')}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl">
            Back to Lessons
          </button>
        </div>
      </div>
    )
  }

  if (!currentDialogueData) return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>

  // ALL 3 COMBO SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-black text-white">
      <div className="bg-black/40 backdrop-blur p-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => setScreen('lessons')} className="text-2xl">←</button>
        <div className="text-center">
          <div className="text-xs opacity-70">{currentLessonData.title}</div>
          <div className="font-bold">{currentDialogue + 1}/{currentLessonData.dialogues.length}</div>
        </div>
        <div className="text-lg">{streak} 🔥</div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4">

        {/* VOCAB CARDS */}
        <div className="bg-white/5 backdrop-blur rounded-3xl p-4">
          <div className="text-sm text-cyan-400 mb-3 font-bold">📚 Learn Words:</div>
          <div className="grid grid-cols-4 gap-2">
            {currentLessonData.vocab.map((word, idx) => (
              <button key={idx} onClick={() => speak(word.german)}
                className="bg-white/10 hover:bg-white/20 rounded-xl p-2 text-center transition active:scale-95">
                <div className="text-2xl mb-1">{word.icon}</div>
                <div className="text-xs font-bold">{word.german}</div>
                <div className="text-[10px] text-gray-400">{word.english}</div>
              </button>
            ))}
          </div>
        </div>

        {/* LISTEN ORIGINAL */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
          <div className="text-xs text-cyan-300 mb-2">🎧 Listen Original:</div>
          <div className="text-2xl font-bold mb-2">{currentDialogueData.prompt}</div>
          <div className="text-cyan-300 text-sm mb-3">[{currentDialogueData.roman}]</div>
          <div className="text-sm text-gray-300 mb-4">{currentDialogueData.meaning}</div>
          <button onClick={() => speak(currentDialogueData.prompt, 0.85)}
            className="w-full bg-blue-600 py-3 rounded-xl font-bold">🔊 Play</button>
        </div>

        {/* BUILD SENTENCE WITH SOUND */}
        <div className="bg-purple-500/10 border-2 border-purple-400 rounded-3xl p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-purple-300 font-bold">🧩 Build Sentence:</div>
            <button onClick={clearWords} className="text-xs bg-red-500/30 px-3 py-1 rounded-lg">Clear</button>
          </div>

          {/* Built Sentence with Play Button */}
          <div className="bg-black/30 rounded-xl p-4 mb-3 min-h-16 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedWords.length === 0? (
                <span className="text-gray-500 text-sm">Tap words below...</span>
              ) : (
                selectedWords.map((word, idx) => (
                  <span key={idx} className="bg-purple-600 px-3 py-2 rounded-lg font-bold text-lg">
                    {word}
                  </span>
                ))
              )}
            </div>
            {selectedWords.length > 0 && (
              <button onClick={playBuiltSentence}
                className="ml-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-bold">
                🔊 Play
              </button>
            )}
          </div>

          {/* Word Bank */}
          <div className="flex flex-wrap gap-2">
            {currentDialogueData.words.map((word, idx) => (
              <button key={idx} onClick={() => toggleWord(word)}
                className={`px-5 py-3 rounded-xl font-bold text-lg transition active:scale-95
                  ${selectedWords.includes(word)
                   ? 'bg-purple-600 ring-2 ring-purple-300'
                    : 'bg-white/10 hover:bg-white/20'
                  }`}>
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* SPEAK/SUBMIT */}
        <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-3xl p-4">
          <div className="text-sm text-yellow-300 mb-3 font-bold">🎤 Check Yourself:</div>
          <div className="text-lg font-bold mb-1">{currentDialogueData.userGoal}</div>
          <div className="text-yellow-300 text-sm mb-2">[{currentDialogueData.userRoman}]</div>
          <div className="text-xs text-gray-400 mb-4">Break: {currentDialogueData.slow}</div>

          <button onClick={startListening}
            disabled={isListening}
            className={`w-full py-4 rounded-xl font-bold text-lg mb-3 transition-all active:scale-95
              ${isListening? 'bg-red-600 animate-pulse' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}>
            {isListening? '🎤 LISTENING...' : '🎤 Speak & Check'}
          </button>

          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Or type answer..."
            className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl p-3 text-white mb-3 focus:border-cyan-500 outline-none"
          />

          <button onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold text-lg active:scale-95 transition">
            Submit → Next
          </button>
        </div>

        {showAnswer && (
          <div className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-4 text-center">
            <div className="text-sm text-green-300 mb-1">Correct Answer:</div>
            <div className="text-2xl font-bold">{currentDialogueData.userGoal}</div>
          </div>
        )}

        {userText && (
          <div className="bg-blue-500/20 border-2 border-blue-400 rounded-2xl p-4 text-center">
            <div className="text-sm text-blue-300">You said:</div>
            <div className="text-xl font-bold">{userText}</div>
          </div>
        )}
      </div>
    </div>
  )
}