---
title: Minecraft 高版本插件服优化指南
tags:
  - 游戏
  - 教程
description: 这是一篇教你优化你的 Minecraft 服务器的教程
categories: 教程
abbrlink: 14390
date: 2022-09-13 17:29:37
updated: 2022-12-10 00:00:00
---
这是一篇教你优化你的 Minecraft 服务器的教程，这篇文章里的所有配置都是 GroupServer 正在使用的配置。

{% note warning %}
**兼容性警告**
本文章将围绕 Minecraft 1.16.5 的服务器进行优化，使用的服务端为 Tuinity，使用的 JRE 为 IBM OpenJ9 VM，操作系统为 CentOS Linux 7，上行宽带 30Mbps。这些配置可能不适用于你的服务器。
{% endnote %}

# 从 JRE(Java) 开始优化
选择一个合适的 JRE 非常重要，将会大幅影响到你服务器的性能。
GroupServer 使用 IBM Semeru Runtime(运行时，运行环境) 的 OpenJ9 VM 作为 JRE，版本为 11（太高的话有些插件会不兼容，太低的话 GC 不彳亍）。
OpenJ9 相比于 HotSpot 有很大的优化，内存占用降低了很多，服务器启动速度也特别快（60+插件一分钟就开好了）
{% note wanring %}
**负优化警告！**
MCBBS 有个帖子说 OpenJ9 降低了将近 20% 的 CPU 性能。如果你的服务器配置不是很垃圾，请考虑选用阿里巴巴的龙泉 OpenJDK！
{% endnote %}

{% note warning %}
**注意：OpenJ9 可能与某些服务器插件/模组不兼容。**
{% endnote %}

{% note info %}
**OpenJ9 下载，JRE 11**
**Linux x64（.tar.gz，JRE）**：https://github.com/ibmruntimes/semeru11-binaries/releases/download/jdk-11.0.15%2B10_openj9-0.32.0/ibm-semeru-open-jre_x64_linux_11.0.15_10_openj9-0.32.0.tar.gz
**Windows x64（.zip，JRE）**：https://github.com/ibmruntimes/semeru11-binaries/releases/download/jdk-11.0.15%2B10_openj9-0.32.0/ibm-semeru-open-jre_x64_windows_11.0.15_10_openj9-0.32.0.zip
{% endnote %}

下载完成后，请将你下载的压缩文件解压到一个空文件夹。解压完成后，复制其路径。更改服务器启动命令为：
```bash
"你复制路径的路径/bin/java" -Xmx1g -Xms1m -jar tuinity-1.16.5_2.jar
# 这是 GroupServer 使用的
"/opt/openj9/bin/java" -Xmx1g -Xms1m -jar tuinity-1.16.5_2.jar
```

启动服务器，看看效果如何吧。

## 从启动参数开始优化

{% note wanring %}
本节的启动参数**可能**仅适用于 OpenJ9 VM。
{% endnote %}

使用适当的启动参数可以优化服务器，下面是 GroupServer 使用的启动参数：
```bash
"/usr/lib/openj9/bin/java" -Xmx1g -Xms1m -Xss340K -Xconmeter:dynamic -Xshareclasses -XcompilationThreads1 -Xaggressive -Xalwaysclassgc -Xtune:virtualized -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -server -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar "tuinity-1.16.5_2.jar" nogui
```

如果你的插件/模组较多，请适当提高一下`-Xss`后面的数字并提高服务器最大内存，例如`-Xmx2g -Xss512K`。
如果你的服务器CPU可用核心比较多，请修改`-XcompilationThreads`后面的数字，将其改为服务器可用核心的数字减半。

# 从服务器配置文件开始优化
## server.properties
> server.properties 是储存多人游戏（Minecraft 或 Minecraft Classic）服务器所有设置的文件。

> 在编辑 server.properties 时，就算不同行之间的顺序可以打乱，确保其与原始的文件有相同的结构也很重要。每一行的等号之前的文本为变量名，您不应该修改这些内容。等号后面为变量的值，您可以按照规则自行编辑。以`#`开头的行为注释，添加、修改或移除注释行不会对游戏造成影响。 保存了server.properties的更改之后，服务端必须重新启动才能使更改生效。 https://minecraft.fandom.com/zh/wiki/Server.properties

```properties
#Minecraft server properties
#Tue Jul 12 02:31:13 CST 2022
enable-jmx-monitoring=false
rcon.port=8081
level-seed=
enable-command-block=false
gamemode=survival
enable-query=false
generator-settings=
level-name=world
motd=Maintenance Mode
query.port=11451
pvp=true
generate-structures=true
difficulty=hard
# 网络压缩阈值，可以控制数据包压缩程度。
# 如果你服务器的 CPU 性能弱，但上行宽带比较高的话，可以将其调为 -1，
# 以关闭此功能。（压缩数据包会占用 CPU）
network-compression-threshold=-1
# 设置每个tick花费的最大毫秒数。超过该毫秒数时，服务器看门狗将停止服务器程序并附带上信息。
# 服务器的一个tick花费了60.00秒（最长也应该只有0.05秒）；判定服务器已崩溃，它将被强制关闭。(Minecraft Wiki)
# 如果你不想让服务器因TPS低而崩溃，可以改为 -1（不建议）
max-tick-time=60000
max-players=10
use-native-transport=true
enable-status=true
# 正版验证
online-mode=false
# 如果你开的是模组服或者允许飞行的生存服，建议将其改为 true，
# 以防玩家被误踢。
allow-flight=true
broadcast-rcon-to-ops=true
# 服务器最大视距，这个是最能影响到服务器性能的
# 生存服建议看情况改为 5-7，模组服建议改为 4-5。
# 太低会影响到玩家的体验，太高会影响到服务器性能
view-distance=5
max-build-height=256
server-ip=
allow-nether=true
# 服务器端口，这个不用我多解释了吧
server-port=11451
sync-chunk-writes=true
# 用不到 RCON 的话建议将其关闭
enable-rcon=false
server-name=Unknown Server
op-permission-level=4
prevent-proxy-connections=false
resource-pack=
entity-broadcast-range-percentage=100
player-idle-timeout=0
rcon.password=
force-gamemode=false
debug=false
rate-limit=0
hardcore=false
# 如果你关了正版验证，那么这个白名单功能就失效了
# 请用第三方插件来代替
white-list=false
broadcast-console-to-ops=true
spawn-npcs=true
spawn-animals=true
snooper-enabled=true
function-permission-level=2
level-type=default
text-filtering-config=
spawn-monsters=true
enforce-whitelist=false
spawn-protection=0
resource-pack-sha1=
max-world-size=29999984

```

## bukkit.yml

```yaml
# This is the main configuration file for Bukkit.
# As you can see, there\'s actually not that much to configure without any plugins.
# For a reference for any variable inside this file, check out the Bukkit Wiki at
# https://www.spigotmc.org/go/bukkit-yml
# 
# If you need help on this file, feel free to join us on irc or leave a message
# on the forums asking for advice.
# 
# IRC: #spigot @ irc.spi.gt
#    (If this means nothing to you, just go to https://www.spigotmc.org/go/irc )
# Forums: https://www.spigotmc.org/
# Bug tracker: https://www.spigotmc.org/go/bugs


settings:
  allow-end: true
  warn-on-overload: true
  permissions-file: permissions.yml
  update-folder: update
  plugin-profiling: false
  connection-throttle: 0
  query-plugins: true
  deprecated-verbose: default
  shutdown-message: 服务器已关闭
  minimum-api: none
  spawn-radius: 1
spawn-limits:
  monsters: 50
  animals: 8
  water-animals: 10
  water-ambient: 20
  ambient: 6
chunk-gc:
  period-in-ticks: 400
ticks-per:
  animal-spawns: 400
  monster-spawns: 15
  water-spawns: 26
  water-ambient-spawns: 26
  ambient-spawns: 26
  autosave: 6000
aliases: now-in-commands.yml
```
上面是 GroupServer 的 bukkit.yml 配置文件，你可以参考一下，**不建议直接无脑复制粘贴**。

{% hideToggle "配置文件解析" %}
**spawn-limits**
这个是限制玩家所在世界的生物最大存在量，其中`monsters`是怪物，`animals`是动物，`water-animals`是水生动物，`water-ambient`是水生环境生物，`ambient`是环境生物。
你可以适当调整一下来控制你服务器的生物生成**（最好不要调的比我低了，调大了的话会导致世界遍地都是生物）**。

**chunk-gc**
多少 Tick（一秒 = 20 ticks）回收一次区块。
建议改成 300-500 以内的数值，改小了对你服务器 CPU 占用有影响，改大了会导致服务器很久才会回收一次区块，会让内存占用一直下不去。

**ticks-per**
多少 Tick 执行一次下面的任务。
`animal-spawns` 动物生成，建议改成 350-500 以内的数值，改小了会导致动物生成很频繁，也会略微影响到你服务器的 CPU 占用，改大了会导致动物生成很慢。
`monster-spawns` 怪物生成，建议改为 10-20 以内的数值，改大了会导致刷怪塔效率降低。
`water-spawns` 水生生物生成。
`water-ambient-spawns` 水生环境生物生成。
`ambient-spawns` 环境生物生成。
`autosave` 自动保存存档，建议改为 4000-8000 以内的数值。改小了会影响到 CPU 占用，改大了会导致很久才会自动保存存档，会导致服务器异常关闭时回档严重。
{% endhideToggle %}

## spigot.yml
```yaml
# This is the main configuration file for Spigot.
# As you can see, there\'s tons to configure. Some options may impact gameplay, so use
# with caution, and make sure you know what each option does before configuring.
# For a reference for any variable inside this file, check out the Spigot wiki at
# http://www.spigotmc.org/wiki/spigot-configuration/
# 
# If you need help with the configuration or have any questions related to Spigot,
# join us at the IRC or drop by our forums and leave a post.
# 
# IRC: #spigot @ irc.spi.gt ( http://www.spigotmc.org/pages/irc/ )
# Forums: http://www.spigotmc.org/

config-version: 12
messages:
  whitelist: You are not whitelisted on this server!
  unknown-command: 未知指令，请输入 \"/help\" 来获取帮助。
  server-full: 服务器已满！
  outdated-client: Outdated client! Please use {0}
  outdated-server: Outdated server! I\'m still on {0}
  restart: 服务器正在重启
stats:
  disable-saving: false
  forced-stats: {}
settings:
  bungeecord: false
  sample-count: 12
  player-shuffle: 0
  user-cache-size: 1000
  save-user-cache-on-stop-only: false
  moved-wrongly-threshold: 0.0625
  moved-too-quickly-multiplier: 10.0
  log-villager-deaths: true
  timeout-time: 60
  restart-on-crash: true
  restart-script: 启动这个破服务器.bat
  netty-threads: 4
  debug: false
  attribute:
    maxHealth:
      max: 2048.0
    movementSpeed:
      max: 2048.0
    attackDamage:
      max: 2048.0
commands:
  spam-exclusions:
  - /skill
  silent-commandblock-console: false
  tab-complete: 0
  send-namespaced: true
  replace-commands:
  - setblock
  - summon
  - testforblock
  - tellraw
  log: true
advancements:
  disable-saving: false
  disabled:
  - minecraft:story/disabled
players:
  disable-saving: false
world-settings:
  default:
    max-entity-collisions: 8
    verbose: false
    mob-spawn-range: 4
    hopper-amount: 1
    dragon-death-sound-radius: 0
    seed-village: 10387312
    seed-desert: 14357617
    seed-igloo: 14357618
    seed-jungle: 14357619
    seed-swamp: 14357620
    seed-monument: 10387313
    seed-shipwreck: 165745295
    seed-ocean: 14357621
    seed-outpost: 165745296
    seed-endcity: 10387313
    seed-slime: 987234911
    seed-bastion: 30084232
    seed-fortress: 30084232
    seed-mansion: 10387319
    seed-fossil: 14357921
    seed-portal: 34222645
    max-tnt-per-tick: 20
    enable-zombie-pigmen-portal-spawns: true
    view-distance: 5
    item-despawn-rate: 6000
    wither-spawn-sound-radius: 0
    arrow-despawn-rate: 1200
    trident-despawn-rate: 1200
    hanging-tick-frequency: 100
    zombie-aggressive-towards-villager: true
    nerf-spawner-mobs: false
    end-portal-sound-radius: 0
    merge-radius:
      exp: 3.0
      item: 2.5
    growth:
      cactus-modifier: 100
      cane-modifier: 100
      melon-modifier: 100
      mushroom-modifier: 100
      pumpkin-modifier: 100
      sapling-modifier: 100
      beetroot-modifier: 100
      carrot-modifier: 100
      potato-modifier: 100
      wheat-modifier: 100
      netherwart-modifier: 100
      vine-modifier: 100
      cocoa-modifier: 100
      bamboo-modifier: 100
      sweetberry-modifier: 100
      kelp-modifier: 100
    entity-activation-range:
      water: 16
      villagers: 16
      flying-monsters: 18
      villagers-work-immunity-after: 100
      villagers-work-immunity-for: 20
      villagers-active-for-panic: true
      animals: 10
      monsters: 24
      raiders: 48
      misc: 4
      tick-inactive-villagers: true
      wake-up-inactive:
        animals-max-per-tick: 4
        animals-every: 800
        animals-for: 60
        monsters-max-per-tick: 8
        monsters-every: 200
        monsters-for: 50
        villagers-max-per-tick: 4
        villagers-every: 400
        villagers-for: 50
        flying-monsters-max-per-tick: 8
        flying-monsters-every: 150
        flying-monsters-for: 80
    ticks-per:
      hopper-transfer: 4
      hopper-check: 1
    hunger:
      jump-walk-exhaustion: 0.05
      jump-sprint-exhaustion: 0.2
      combat-exhaustion: 0.1
      regen-exhaustion: 6.0
      swim-multiplier: 0.01
      sprint-multiplier: 0.1
      other-multiplier: 0.0
    max-tick-time:
      tile: 50
      entity: 50
    squid-spawn-range:
      min: 45.0
    entity-tracking-range:
      players: 42
      animals: 42
      monsters: 42
      misc: 30
      other: 60
  worldeditregentempworld:
    verbose: false

```
{% hideToggle "配置文件解析" %}
**mob-spawn-range**
以玩家为中心的半径多少区块内可以刷怪(https://www.mcbbs.net/thread-1082459-1-2.html)
建议将其改为 4-5。

这段内容我写不下去了，请查看 https://www.mcbbs.net/thread-1082459-1-2.html
{% endhideToggle %}

## paper.yml

{% note wanring %}
**注意：本章内容仅适用于基于 Spigot 的 Paper 服务端。**
{% endnote %}

```yaml
# This is the main configuration file for Paper.
# As you can see, there\'s tons to configure. Some options may impact gameplay, so use
# with caution, and make sure you know what each option does before configuring.
# 
# If you need help with the configuration or have any questions related to Paper,
# join us in our Discord or IRC channel.
# 
# Discord: https://discord.gg/papermc
# IRC: #paper @ irc.esper.net ( https://webchat.esper.net/?channels=paper ) 
# Website: https://papermc.io/ 
# Docs: https://paper.readthedocs.org/ 

use-display-name-in-quit-message: false
verbose: false
config-version: 20
settings:
  use-alternative-luck-formula: false
  load-permissions-yml-before-plugins: true
  bungee-online-mode: true
  console-has-all-permissions: false
  region-file-cache-size: 256
  incoming-packet-spam-threshold: 300
  max-joins-per-tick: 3
  track-plugin-scoreboards: false
  suggest-player-names-when-null-tab-completions: true
  fix-entity-position-desync: true
  chunk-tasks-per-tick: 1000
  save-empty-scoreboard-teams: false
  enable-player-collisions: true
  player-auto-save-rate: -1
  max-player-auto-save-per-tick: -1
  velocity-support:
    enabled: false
    online-mode: false
    secret: \'\'
  unsupported-settings:
    allow-headless-pistons: true
    allow-permanent-block-break-exploits: true
    allow-piston-duplication: true
    allow-headless-pistons-readme: This setting controls if players should be able
      to create headless pistons.
    allow-permanent-block-break-exploits-readme: This setting controls if players
      should be able to break bedrock, end portals and other intended to be permanent
      blocks.
    allow-piston-duplication-readme: This setting controls if player should be able
      to use TNT duplication, but this also allows duplicating carpet, rails and potentially
      other items
  watchdog:
    early-warning-every: 5000
    early-warning-delay: 10000
  spam-limiter:
    tab-spam-increment: 1
    tab-spam-limit: 500
    recipe-spam-increment: 1
    recipe-spam-limit: 20
  book-size:
    page-max: 2560
    total-multiplier: 0.98
  async-chunks:
    threads: -1
  console:
    enable-brigadier-highlighting: true
    enable-brigadier-completions: true
  item-validation:
    display-name: 8192
    loc-name: 8192
    lore-line: 8192
    book:
      title: 8192
      author: 8192
      page: 16384
messages:
  no-permission: '&c你没有权限这么做'
  kick:
    authentication-servers-down: ''
    connection-throttle: Connection throttled! Please wait before reconnecting.
    flying-player: 非法飞行，请使用 /fly 指令来开启飞行。如果你什么也没干就这样了，请重进服务器
    flying-vehicle: 非法飞行，请使用 /fly 指令来开启飞行。如果你什么也没干就这样了，请重进服务器
timings:
  enabled: false
  verbose: true
  server-name-privacy: false
  hidden-config-entries:
  - database
  - settings.bungeecord-addresses
  - settings.velocity-support.secret
  - settings.seed
  - settings.seed.dungeon
  - settings.seed.end-spike
  - server-ip
  - worldgen.seeds.populator
  history-interval: 300
  history-length: 3600
  server-name: Unknown Server
world-settings:
  default:
    piglins-guard-chests: true
    seed-based-feature-search-loads-chunks: false
    map-item-frame-cursor-limit: 128
    fix-items-merging-through-walls: false
    show-sign-click-command-failure-msgs-to-player: false
    fix-wither-targeting-bug: false
    allow-using-signs-inside-spawn-protection: false
    should-remove-dragon: false
    ender-dragons-death-always-places-dragon-egg: false
    optimize-explosions: true
    falling-block-height-nerf: 0
    tnt-entity-height-nerf: 0
    filter-nbt-data-from-spawn-eggs-and-related: true
    max-entity-collisions: 8
    disable-creeper-lingering-effect: false
    duplicate-uuid-resolver: saferegen
    duplicate-uuid-saferegen-delete-range: 32
    phantoms-do-not-spawn-on-creative-players: true
    phantoms-only-attack-insomniacs: true
    update-pathfinding-on-block-update: false
    remove-corrupt-tile-entities: false
    fixed-chunk-inhabited-time: -1
    experience-merge-max-value: -1
    baby-zombie-movement-modifier: 0.5
    use-vanilla-world-scoreboard-name-coloring: false
    count-all-mobs-for-spawning: false
    per-player-mob-spawns: true
    max-auto-save-chunks-per-tick: 10
    delay-chunk-unloads-by: 8s
    disable-teleportation-suffocation-check: false
    prevent-moving-into-unloaded-chunks: true
    seed-based-feature-search: true
    grass-spread-tick-rate: 3
    water-over-lava-flow-speed: 5
    use-faster-eigencraft-redstone: true
    armor-stands-do-collision-entity-lookups: true
    keep-spawn-loaded: false
    disable-thunder: false
    skeleton-horse-thunder-spawn-chance: 0.01
    disable-ice-and-snow: false
    keep-spawn-loaded-range: 0
    nether-ceiling-void-damage-height: 0
    only-players-collide: false
    allow-vehicle-collisions: true
    allow-non-player-entities-on-scoreboards: false
    portal-search-radius: 128
    portal-create-radius: 16
    portal-search-vanilla-dimension-scaling: true
    container-update-tick-rate: 2
    parrots-are-unaffected-by-player-movement: false
    disable-explosion-knockback: false
    fix-climbing-bypassing-cramming-rule: true
    prevent-tnt-from-moving-in-water: false
    iron-golems-can-spawn-in-air: false
    max-leash-distance: 10
    armor-stands-tick: true
    non-player-arrow-despawn-rate: -1
    creative-arrow-despawn-rate: -1
    spawner-nerfed-mobs-should-jump: false
    entities-target-with-follow-range: false
    zombies-target-turtle-eggs: true
    zombie-villager-infection-chance: -1
    all-chunks-are-slime-chunks: false
    mob-spawner-tick-rate: 3
    light-queue-size: 20
    auto-save-interval: -1
    enable-treasure-maps: true
    treasure-maps-return-already-discovered: false
    max-growth-height:
      cactus: 3
      reeds: 3
      bamboo:
        max: 16
        min: 11
    frosted-ice:
      enabled: true
      delay:
        min: 20
        max: 40
    lootables:
      auto-replenish: false
      restrict-player-reloot: true
      reset-seed-on-fill: true
      max-refills: -1
      refresh-min: 12h
      refresh-max: 2d
    mobs-can-always-pick-up-loot:
      zombies: false
      skeletons: false
    alt-item-despawn-rate:
      enabled: false
      items:
        COBBLESTONE: 300
    game-mechanics:
      disable-pillager-patrols: false
      fix-curing-zombie-villager-discount-exploit: true
      scan-for-legacy-ender-dragon: true
      disable-chest-cat-detection: true
      nerf-pigmen-from-nether-portals: false
      disable-end-credits: false
      disable-player-crits: false
      disable-sprint-interruption-on-attack: false
      shield-blocking-delay: 5
      disable-unloaded-chunk-enderpearl-exploit: true
      disable-relative-projectile-velocity: false
      disable-mob-spawner-spawn-egg-transformation: false
      pillager-patrols:
        spawn-chance: 0.25
        spawn-delay:
          per-player: false
          ticks: 12000
        start:
          per-player: false
          day: 5
    hopper:
      cooldown-when-full: true
      disable-move-event: true
    lightning-strike-distance-limit:
      sound: -1
      impact-sound: -1
      flash: -1
    wandering-trader:
      spawn-minute-length: 1200
      spawn-day-length: 24000
      spawn-chance-failure-increment: 25
      spawn-chance-min: 25
      spawn-chance-max: 75
    door-breaking-difficulty:
      zombie:
      - HARD
      vindicator:
      - NORMAL
      - HARD
    fishing-time-range:
      MinimumTicks: 100
      MaximumTicks: 600
    entity-per-chunk-save-limit:
      experience_orb: -1
      snowball: -1
      ender_pearl: -1
      arrow: -1
    despawn-ranges:
      soft: 32
      hard: 128
    anti-xray:
      enabled: true
      engine-mode: 1
      max-chunk-section-index: 3
      update-radius: 2
      lava-obscures: false
      use-permission: false
      hidden-blocks:
      - gold_ore
      - iron_ore
      - coal_ore
      - lapis_ore
      - mossy_cobblestone
      - obsidian
      - chest
      - diamond_ore
      - redstone_ore
      - clay
      - emerald_ore
      - ender_chest
      replacement-blocks:
      - stone
      - oak_planks
    viewdistances:
      no-tick-view-distance: -1
    squid-spawn-height:
      maximum: 0
    generator-settings:
      flat-bedrock: false
    spawn-limits:
      monsters: -1
      animals: -1
      water-animals: -1
      water-ambient: -1
      ambient: -1
    unsupported-settings:
      fix-invulnerable-end-crystal-exploit: true

```
{% hideToggle "配置文件解析" %}
**settings.unsupported-settings.allow-headless-pistons**
是否允许无头活塞，通常用于破坏基岩等方块
如果你是生存服建议设为 true，可增强玩家游戏体验

**settings.unsupported-settings.allow-permanent-block-break-exploits**
是否可以使用原版漏洞破坏不可破坏的方块
同上

**settings.unsupported-settings.allow-piston-duplication**
是否允许刷方块，例如复制TNT、刷地毯和铁轨
同上

**timings.enabled**
Timings 是一个服务器性能分析工具，可让你分析出服务器卡顿的原因是什么。但Timings也会占用服务器的一些资源。如果你不经常用这玩意，建议将其设为 false 来关闭 Timings，需要用的时候执行指令`/timings on`就行了。

**world-settings.default.seed-based-feature-search-loads-chunks**
基于种子的特征搜索加载区块（禁用后会提高性能，但会影响/locate指令）
不知道这东西会不会影响随机传送插件的传送至特定的生物群系的功能。我选择了关闭，但也没见性能提升了多少

**world-settings.default.optimize-explosions**
优化爆炸，强烈建议开启

**world-settings.default.keep-spawn-loaded**
保持出生点区块加载。如果你不是生电服服务器性能还垃圾建议关闭

**world-settings.default.game-mechanics.disable-chest-cat-detection**
箱子上有猫是否可以开启箱子。默认这个选项是关闭的，服务器会一直检测箱子上是否有猫，这会略微降低服务器性能，建议将其改为 true

**world-settings.default.anti-xray.enabled**
开启防Xray（矿物透视），强烈建议开启，没有什么插件能比这个自带的性能要好了，对性能影响几乎没有

**world-settings.hopper.disable-move-event**
是否禁用漏斗的move事件，禁用后可以降低漏斗占用，但coreprotect，领地插件等可能无法记录或保护漏斗物品(https://www.mcbbs.net/thread-1082459-1-2.html)
{% endhideToggle %}