<template>
  <div>
    <v-container>
      <div 
        v-if="!account"
        class="text-h5"
      >
        <p>Ethers.jsを使ってMetaMaskに接続する</p>
        <v-btn @click="connectToMetamask">
          MetaMaskに接続
        </v-btn>
      </div>
      <v-card v-else>
        <v-card-title>MetaMaskに接続しました</v-card-title>
        <v-card-subtitle>アカウント: {{ account }}</v-card-subtitle>
        <v-card-text>
          <p>接続を解除するには、Google拡張機能のMetaMaskから操作し、リロードしてください。</p>
        </v-card-text>
      </v-card>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ethers } from 'ethers';

const account = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

onMounted(() => {
  connectToMetamask();
});

const connectToMetamask = async () => {
  if (window.ethereum == null) {
    errorMessage.value = "MetaMaskがインストールされていません。";
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  try {
    const signer = await provider.getSigner();
    account.value = await signer.getAddress();
    errorMessage.value = null;
  } catch (error: any) {
    if (error.code === 'ACTION_REJECTED') {
      errorMessage.value = "ユーザーが接続を拒否しました。";
    } else {
      errorMessage.value = "エラーが発生しました: " + error.message;
    }
  }
}
</script>
