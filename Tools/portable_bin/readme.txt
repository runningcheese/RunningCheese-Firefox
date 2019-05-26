关于libportable:
一个实现firefox便携化的开源库,全部代码由c语言写成.
libportable重新实现了tete(一个出色的firefox第三方编译者)的私有模块,兼容tete的配置文件,并开放源代码.
无缝兼容windows所有平台,因为使用标准c语言,你可以使用任何编译器编译成二进制文件.
可直接改名并替换tete的tmemutil.dll文件以实现安全增强.

libportable的构建与使用:
(http://sourceforge.net/projects/libportable/)
获取源代码:
git clone https://github.com/adonais/libportable.git

libportable特性:
1,防止全局钩子注入.
2,防止部分api hook.
3,防止firefox远程溢出攻击(flash与java插件实行注入保护).
4,老板键支持.
4,便携式支持.
5,支持启动/关闭第三方进程.
6,支持进程平衡调节.
7,禁止通过扫描注册表安装扩展与插件.
8,支持自动激活标签页.
9,支持第三方编译版本的自动更新.

如何使用libportable二进制版本:
1,把压缩包类文件解压到firefox安装目录,运行injectpe.bat.
  当命令行运行成功后,会自动删除多余的文件.
2,具体看App\\portable(example).ini文件示例,改名为portable.ini即可使用.

关于injectpe命令行工具的使用:
//请参考injectpe.bat里面的代码.
//或者命令行帮助
injectpe_x86.exe --help

注意:injectpe_x86或injectpe_x64针对的是firefox的x86或x64版本,而不是windows系统.
比如,你在win7 x64上运行 firefox(x86)版本,你需要使用injectpe_x86.exe进行注入.

portable.ini文件的示例:
http://sourceforge.net/p/libportable/wiki

如果使用中有任何问题,请查考wiki: 
http://sourceforge.net/p/libportable/wiki
或者bbs:
http://bbs.kafan.cn/thread-1651432-1-1.html
给我留言.

备注:
1)不要在Iceweasel,lawlietfox,pcxfirefox,tete009这些编译版上使用injectpe注入,因为它们原生支持便携式.
2)新增自动更新接口,请根据App\\portable(example).ini文件示例配置你的portable.ini
3)更新日志见:
https://github.com/adonais/libportable/commits/master
4)upcheck.exe为自动更新检测工具,配合libportable可实现第三方编译版本的自动升级.
  upcheck.exe支持多线程下载,可自动解压7z,zip文件.
