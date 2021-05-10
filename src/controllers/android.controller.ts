export async function magisk_format(stable, canary): Promise<string> {
    let parced =
        `*Ultimas versiones de magisk*\n\n` +
        `_Estable_\n` +
        `*• Version:* _${stable.version}_(${stable.versionCode})\n` +
        `*• Apk:* [app-release.apk](${stable.link})\n` +
        `*• Notes:* [magisk-${stable.versionCode}.md](${stable.note})\n\n` +
        `_Canary_\n` +
        `*• Version:* _${canary.version}_(${canary.versionCode})\n` +
        `*• Apk:* [app-release.apk](${canary.link})\n` +
        `*• Notes:* [magisk-${canary.versionCode}.md](${canary.note})\n\n`
    return parced
}
export async function get_version(build: number): Promise<string> {
    let capa;
    build == 11 ? capa = 'OneUI 3.x' :
        build == 10 ? capa = 'OneUI 2.x' :
            build == 9 ? capa = 'OneUI 1.x' :
                build == 8 ? capa = 'Samsung Experience' :
                    build == 7 ? capa = 'Samsung Experience' :
                        capa = `Touchwiz`
    return capa
};