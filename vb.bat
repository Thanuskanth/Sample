Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "E:\sam\invoice\client
\New Text Document.cmd" & Chr(34), 0
Set WinScriptHost = Nothing