import { SignClient }  from '@walletconnect/sign-client'
// import fs from "fs"

let main = async function() {
  const client = await SignClient.init({
    // logging: "debug",
    projectId: "2155753170ee50854f546620185aeaed",
    relayUrl: "wss://relay.walletconnect.com",
    metadata: {
      name: "Chainweaver Wallet",
      description: "Kadena's official wallet",
      url: "https://chainweaver-test.kadena.network",
      icons: [],
    },
  });
  
  const { uri, approval } = await client.connect({
    requiredNamespaces: {
      kadena: {
        chains: ["kadena:testnet04"],
        methods: ["kadena_sign", "kadena_quicksign"],
        events: [],
      },
    },
  });
  
  // uri will be returned, unless you used existing pairingTopic
  if (uri) {
    console.log(uri)
    // fs.writeFile('uri.txt', uri, () => undefined)
  } else {
    console.log("NO URI")
  }
  
  // You can optionally wait for pairing to be complete by the peer and get session
  console.log("WAITING for approval");
  const session = await approval();
  console.log(session);
  
  // let signObj = "{\"code\": \"(coin.transfer \\\"bob\\\" \\\"alice\\\" 0.1)\", \"caps\": [], \"data\": {\"ks\": {\"pred\": \"keys-all\", \"keys\": [\"368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca\"]}}, \"chainId\": \"0\", \"sender\": \"alice\", \"gasPrice\": 1e-05, \"gasLimit\": 1200, \"nonce\": \"2020-01-29 16:46:22.916695 UTC\", \"ttl\": 7200, \"signingPubKey\": \"61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\", \"networkId\": \"mainnet01\"}"
  let cmd = "{\"signers\":[{\"pubKey\":\"61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\",\"clist\":[{\"name\":\"coin.TRANSFER_XCHAIN\",\"args\":[\"k:61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\",\"k:61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\",1,\"0\"]},{\"name\":\"coin.GAS\",\"args\":[]}]}],\"meta\":{\"creationTime\":1659935045,\"ttl\":28800,\"chainId\":\"1\",\"gasPrice\":1.0e-6,\"gasLimit\":450,\"sender\":\"k:61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\"},\"nonce\":\"chainweaver\",\"networkId\":\"testnet04\",\"payload\":{\"exec\":{\"code\":\"(coin.transfer-crosschain \\\"k:61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\\\" \\\"k:61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\\\" (read-keyset 'ks) \\\"0\\\" 1.0)\",\"data\":{\"ks\":{\"keys\":[\"61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57\"],\"pred\":\"keys-all\"}}}}}";
  const result = await client.request({
    topic: session.topic,
    chainId: "kadena:testnet04",
    request: {
      // jsonrpc: "2.0",
      method: "kadena_quicksign",
      params: {
        reqs: [{sigs:{"61f065c49da75d843715ea6bb4d95c7ae202c0f9124ac325557283a3ef5e4e57":null}, cmd}]
      }
      ,
    },
  });
  console.log(result)
}

main();
