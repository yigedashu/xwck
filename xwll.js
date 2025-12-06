// filter.js - 只显示分组名，没有频道
function main(item) {
    // 原直播源地址
    let liveUrl = 'https://bc.188766.xyz/?ip=&mima=mianfeibuhuaqian&huikan=1';
    
    // 获取原始内容
    let content = ku9.get(liveUrl);
    
    // 按行分割
    let lines = content.split('\n');
    let result = [];
    let skip = false;
    
    // 过滤"🎀冰茶公告"
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        if (line.includes('🎀冰茶公告')) {
            skip = true;
            continue;
        }
        
        if (skip && (line.startsWith('http://') || line.startsWith('https://'))) {
            skip = false;
            continue;
        }
        
        if (!skip) {
            result.push(line);
        }
    }
    
    // 添加"关注刘德华"分组（只有一个注释行，没有实际频道）
    result.push('# 分组：关注小伟来了公众号');
    
    return { m3u: result.join('\n') };
}
