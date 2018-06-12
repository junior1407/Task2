function changeConteudo(v)
{
  if (!document.getElementById("1").className.match(/(?:^|\s)disabledd(?!\S)/) )
  {
  document.getElementById("1").className += " disabledd";
  }

  if (!document.getElementById("2").className.match(/(?:^|\s)disabledd(?!\S)/) )
  {
  document.getElementById("2").className += " disabledd";
  }

  if (!document.getElementById("3").className.match(/(?:^|\s)disabledd(?!\S)/) )
  {
  document.getElementById("3").className += " disabledd";
  }

  if (!document.getElementById("4").className.match(/(?:^|\s)disabledd(?!\S)/) )
  {
  document.getElementById("4").className += " disabledd";
  }

  if (!document.getElementById("5").className.match(/(?:^|\s)disabledd(?!\S)/) )
  {
  document.getElementById("5").className += " disabledd";
  }

document.getElementById(v).className =
   document.getElementById(v).className.replace
      ( /(?:^|\s)disabledd(?!\S)/g , '' );

}
