<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-card
            class="color-pallet h-100"
          >
            <v-card-text>
              <!-- <div v-html="xssText" /> # サニタイズしないとアラートが表示される -->
              <div v-html="sanitizeHtml(switchMode === 'xss' ? xssText : richText, sanitizeOptions)" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="#08ffc8"
                @click="switchMode='cool'"
              >
                クール系
              </v-btn>
              <v-btn
                color="#ffb6b9"
                @click="switchMode='cute'"
              >
                かわいい系
              </v-btn>
              <v-btn
                color="red"
                @click="switchMode='xss'"
              >
                XSS攻撃
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          cols="4"
          class="d-none d-md-block"
        >
          <v-card
            title="ペットの冒険"
            subtitle="ここから下の画像が追従するよ"
            class="mb-8"
          />
          <v-card class="sidebar-sticky">
            <v-img src="https://placekitten.com/300/300" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from 'sanitize-html';
type ColorType = {
  h1: string
  h2: string
  h3: string
  back: string
}

const coolColor: ColorType = {
  h1: '#08ffc8',
  h2: '#fff7f7',
  h3: '#dadada',
  back: '#204969'
}

const cuteColor: ColorType = {
  h1: '#ffb6b9',
  h2: '#fae3d9',
  h3: '#bbded6',
  back: '#8ac6d1'
}

const switchMode = ref<'cool' | 'cute' | 'xss'>('cool')

const sanitizeOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'p', 'img'],
  allowedAttributes: {
    'img': ['src', 'alt']  // デフォルトでもonerrorなどのイベントハンドラは許可していないが、明示的に。
  }
}

const richText = `
  <h1>ペットの冒険</h1>
  <h2>うちのペット</h2>
  <p>こんにちは、みんな！私の家にはかわいいペットがいるんだ。名前はミケとポチ。ミケは黒猫で、ポチは元気な犬だよ。一緒に遊ぶのが大好きで、家族みんなで楽しい時間を過ごしているんだ。</p>
  <h2>冒険の始まり</h2>
  <p>ある日、ミケとポチは一緒に冒険に出かけることになったんだ。ミケは猫なのに、なんだか冒険者みたいな気分になるんだよ。</p>
  <h3>森への旅</h3>
  <p>まずは森へ行ってみることにしたよ。木々の間をくぐり抜けながら歩くと、鳥のさえずりが聞こえてきてとっても心地よかった。ポチはワンワンと元気に駆け回って、私たちを楽しませてくれたんだ。</p>
  <h3 class="highlight">川での出来事</h3>
  <p>森を抜けると、きれいな川が広がっていたんだ。ミケは初めての水辺に興味津々で近づいていったよ。すると、ミケがジャンプして川に飛び込んでしまったんだ！でも大丈夫、私たちはすぐに助けてあげたんだ。ミケはびしょ濡れになっちゃったけれど、みんなで笑っていたよ。</p>
  <h3>大冒険の終わり</h3>
  <p>冒険は楽しい思い出と共に終わったんだけれど、ミケとポチはいつも一緒にいるから、これからもたくさんの冒険が待っていると思うんだ。ペットとの冒険は最高だね！</p>
  <p>それではまたね！</p>
`

// MEMO: <img src="存在しない画像">のようにサニタイズされる。
const xssText = `<p>攻撃を仕掛けるテキスト</p><img src="存在しない画像" onerror="alert('XSS攻撃!')" />` 
</script>


<style lang="sass">
.color-pallet
  h1
    background: v-bind("switchMode === 'cool' ? coolColor.h1 : cuteColor.h1")
    font-size: 3rem
    margin: 80px 0
  h2
    background: v-bind("switchMode === 'cool' ? coolColor.h2 : cuteColor.h2")
    font-size: 2rem
    margin: 50px 0
  h3
    background: v-bind("switchMode === 'cool' ? coolColor.h3 : cuteColor.h3")
    font-size: 1.5rem
    margin: 40px 0
  p
    color: v-bind("switchMode === 'cool' ? coolColor.back : cuteColor.back")

.sidebar-sticky
  position: sticky
  top: 40px
  max-height: 50vh
</style>
