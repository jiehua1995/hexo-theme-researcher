/**
 * Post Content Processing Script
 * Handles math formulas, tables, code blocks with copy functionality and folding
 */

// 复制 URL 到剪贴板的函数
function copyToClipboard() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(function() {
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    button.classList.remove('btn-outline');
    button.classList.add('btn-success');
    
    setTimeout(function() {
      button.innerHTML = originalText;
      button.classList.remove('btn-success');
      button.classList.add('btn-outline');
    }, 2000);
  }).catch(function(err) {
    console.error('Failed to copy: ', err);
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    button.classList.remove('btn-outline');
    button.classList.add('btn-success');
    
    setTimeout(function() {
      button.innerHTML = originalText;
      button.classList.remove('btn-success');
      button.classList.add('btn-outline');
    }, 2000);
  });
}

function __rcProcessPost() {
  const processedContent = document.getElementById('processed-content');
  if (!processedContent) return;
  // idempotent: avoid double-processing the same element (needed because the
  // MutationObserver may fire __rcProcessPost more than once per swap).
  if (processedContent.getAttribute('data-rc-done')) return;
  processedContent.setAttribute('data-rc-done', '1');
  
  let content = processedContent.innerHTML;

  // ========== 数学公式处理 ==========
  console.log('开始处理数学公式...');
  
  // 1. 处理单行公式：<p>$$formula$$</p>
  content = content.replace(/<p>\s*\$\$([\s\S]*?)\$\$\s*<\/p>/g, function(match, formula) {
    console.log('找到单行公式:', formula.trim());
    return '<div class="math-display">$$' + formula.trim() + '$$</div>';
  });

  // 2. 处理多行公式：<p>$$</p>...content...<p>$$</p>
  content = content.replace(/<p>\s*\$\$\s*<\/p>([\s\S]*?)<p>\s*\$\$\s*<\/p>/g, function(match, mathContent) {
    console.log('找到多行公式:', mathContent);
    const cleanContent = mathContent
      .replace(/<p>/g, '\n')
      .replace(/<\/p>/g, '')
      .replace(/\n+/g, '\n')
      .trim();
    console.log('清理后的数学内容:', cleanContent);
    return '<div class="math-display">$$\n' + cleanContent + '\n$$</div>';
  });

  // 3. 清理任何剩余的单独$$ 
  content = content.replace(/<p>\s*\$\$\s*<\/p>/g, '');
  
  console.log('数学公式处理完成');

  // 更新内容
  processedContent.innerHTML = content;

  // ========== 表格滚动容器处理 ==========
  const tables = processedContent.querySelectorAll('table');
  tables.forEach(function(table) {
    if (!table.closest('.table-container')) {
      const container = document.createElement('div');
      container.className = 'table-container';
      table.parentNode.insertBefore(container, table);
      container.appendChild(table);
    }
  });

  // ========== 代码块转换 ==========
  setTimeout(function() {
    console.log('开始处理代码块...');
    
    // 获取主题配置
    const codeCollapseEnabled = window.themeConfig && window.themeConfig.code_collapse && window.themeConfig.code_collapse.enabled;
    const collapseThreshold = (window.themeConfig && window.themeConfig.code_collapse && window.themeConfig.code_collapse.lines) || 5;
    
    console.log('代码折叠配置:', { enabled: codeCollapseEnabled, threshold: collapseThreshold });
    
    // 转换 Hexo highlight.js 代码块为 mockup-code 样式
    const highlightFigures = processedContent.querySelectorAll('figure.highlight');
    console.log('找到代码块数量:', highlightFigures.length);
    
    highlightFigures.forEach(function(figure) {
      const codeLines = [];
      const lineSpans = figure.querySelectorAll('td.code .line');
      
      // 获取语言类型
      let language = 'code';
      const classList = Array.from(figure.classList);
      for (let className of classList) {
        if (className !== 'highlight' && className !== 'line-numbers') {
          language = className;
          break;
        }
      }
      
      lineSpans.forEach(function(lineSpan) {
        let lineText = '';
        for (let node of lineSpan.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            lineText += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            lineText += node.textContent;
          }
        }
        codeLines.push(lineText);
      });

      // 如果没有从表格获取到行，尝试其他方法
      if (codeLines.length === 0) {
        const codeContent = figure.querySelector('td.code');
        if (codeContent) {
          const text = codeContent.textContent || codeContent.innerText;
          codeLines.push(...text.split('\n').filter(line => line.trim() !== ''));
        }
      }

      if (codeLines.length === 0) return;

      // 创建新的 mockup-code 容器
      const mockupCode = document.createElement('div');
      mockupCode.className = 'mockup-code bg-base-200 text-base-content w-full';
      
      // 添加工具栏（语言徽章 + 复制按钮）
      const toolbar = document.createElement('div');
      toolbar.className = 'code-toolbar';
      
      // 语言徽章
      const langBadge = document.createElement('span');
      langBadge.className = 'code-lang-badge badge badge-primary badge-sm';
      langBadge.textContent = language.toUpperCase();
      
      // 复制按钮
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn btn btn-xs btn-ghost';
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      copyBtn.setAttribute('aria-label', 'Copy code');
      copyBtn.setAttribute('data-clipboard-text', codeLines.join('\n'));
      
      toolbar.appendChild(langBadge);
      toolbar.appendChild(copyBtn);
      
      // 创建代码容器
      const codeContainer = document.createElement('div');
      codeContainer.className = 'code-content';
      
      // 检查是否需要折叠
      const shouldCollapse = codeCollapseEnabled && codeLines.length > collapseThreshold;
      
      // 生成代码行
      codeLines.forEach((line, index) => {
        const lineNumber = index + 1;
        const escapedLine = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        
        // 检测特殊行类型并添加相应样式
        let className = '';
        const lowerLine = line.toLowerCase().trim();
        
        if (lowerLine.includes('error') || lowerLine.includes('exception') || lowerLine.includes('failed')) {
          className = ' class="bg-error text-error-content';
        } else if (lowerLine.includes('warning') || lowerLine.includes('warn')) {
          className = ' class="bg-warning text-warning-content';
        } else if (lowerLine.includes('success') || lowerLine.includes('done') || lowerLine.includes('completed')) {
          className = ' class="bg-success text-success-content';
        } else if (lowerLine.includes('info') || lowerLine.includes('installing') || lowerLine.includes('loading')) {
          className = ' class="bg-info text-info-content';
        }
        
        // 添加折叠类
        if (shouldCollapse && index >= collapseThreshold) {
          className += (className ? ' code-line-collapsed' : ' class="code-line-collapsed');
        }
        
        if (className && !className.endsWith('"')) {
          className += '"';
        }
        
        const preElement = document.createElement('pre');
        preElement.setAttribute('data-prefix', lineNumber);
        if (className) {
          preElement.className = className.replace('class="', '').replace('"', '');
        }
        preElement.innerHTML = `<code>${escapedLine}</code>`;
        codeContainer.appendChild(preElement);
      });
      
      // 组装代码块
      mockupCode.appendChild(toolbar);
      mockupCode.appendChild(codeContainer);
      
      // 添加展开/折叠按钮
      if (shouldCollapse) {
        const expandBtn = document.createElement('button');
        expandBtn.className = 'code-expand-btn btn btn-xs btn-ghost btn-block mt-2';
        expandBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Expand (' + (codeLines.length - collapseThreshold) + ' lines)';
        expandBtn.addEventListener('click', function() {
          const isExpanded = mockupCode.classList.contains('code-expanded');
          if (isExpanded) {
            mockupCode.classList.remove('code-expanded');
            expandBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Expand (' + (codeLines.length - collapseThreshold) + ' lines)';
          } else {
            mockupCode.classList.add('code-expanded');
            expandBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Collapse';
          }
        });
        mockupCode.appendChild(expandBtn);
      }
      
      figure.parentNode.replaceChild(mockupCode, figure);
    });

    // 处理其他普通的 pre/code 块
    const preBlocks = processedContent.querySelectorAll('pre:not(.mockup-code pre)');
    preBlocks.forEach(function(pre) {
      if (pre.closest('.mockup-code')) return;
      
      const codeElement = pre.querySelector('code') || pre;
      let language = 'code';
      
      // 尝试从 code 元素的 class 获取语言
      if (codeElement.className) {
        const match = codeElement.className.match(/language-(\w+)/);
        if (match) {
          language = match[1];
        }
      }
      
      const text = codeElement.textContent || codeElement.innerText || '';
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length === 0) return;
      
      const mockupCode = document.createElement('div');
      mockupCode.className = 'mockup-code bg-base-200 text-base-content w-full';
      
      // 添加工具栏
      const toolbar = document.createElement('div');
      toolbar.className = 'code-toolbar';
      
      const langBadge = document.createElement('span');
      langBadge.className = 'code-lang-badge badge badge-primary badge-sm';
      langBadge.textContent = language.toUpperCase();
      
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn btn btn-xs btn-ghost';
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      copyBtn.setAttribute('aria-label', 'Copy code');
      copyBtn.setAttribute('data-clipboard-text', lines.join('\n'));
      
      toolbar.appendChild(langBadge);
      toolbar.appendChild(copyBtn);
      
      // 创建代码容器
      const codeContainer = document.createElement('div');
      codeContainer.className = 'code-content';
      
      // 检查是否需要折叠
      const shouldCollapse = codeCollapseEnabled && lines.length > collapseThreshold;
      
      // 生成代码行
      lines.forEach((line, index) => {
        const lineNumber = index + 1;
        const escapedLine = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        
        const preElement = document.createElement('pre');
        preElement.setAttribute('data-prefix', lineNumber);
        if (shouldCollapse && index >= collapseThreshold) {
          preElement.className = 'code-line-collapsed';
        }
        preElement.innerHTML = `<code>${escapedLine}</code>`;
        codeContainer.appendChild(preElement);
      });
      
      // 组装代码块
      mockupCode.appendChild(toolbar);
      mockupCode.appendChild(codeContainer);
      
      // 添加展开/折叠按钮
      if (shouldCollapse) {
        const expandBtn = document.createElement('button');
        expandBtn.className = 'code-expand-btn btn btn-xs btn-ghost btn-block mt-2';
        expandBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Expand (' + (lines.length - collapseThreshold) + ' lines)';
        expandBtn.addEventListener('click', function() {
          const isExpanded = mockupCode.classList.contains('code-expanded');
          if (isExpanded) {
            mockupCode.classList.remove('code-expanded');
            expandBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Expand (' + (lines.length - collapseThreshold) + ' lines)';
          } else {
            mockupCode.classList.add('code-expanded');
            expandBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Collapse';
          }
        });
        mockupCode.appendChild(expandBtn);
      }
      
      pre.parentNode.replaceChild(mockupCode, pre);
    });

    console.log('代码块处理完成');

    // ========== 初始化 ClipboardJS ==========
    if (typeof ClipboardJS !== 'undefined') {
      const clipboard = new ClipboardJS('.copy-code-btn');
      
      clipboard.on('success', function(e) {
        const btn = e.trigger;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-ghost');
        
        setTimeout(function() {
          btn.innerHTML = originalHTML;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-ghost');
        }, 2000);
        
        e.clearSelection();
        console.log('代码复制成功');
      });
      
      clipboard.on('error', function(e) {
        const btn = e.trigger;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        btn.classList.add('btn-error');
        btn.classList.remove('btn-ghost');
        
        setTimeout(function() {
          btn.innerHTML = originalHTML;
          btn.classList.remove('btn-error');
          btn.classList.add('btn-ghost');
        }, 2000);
        
        console.error('代码复制失败:', e);
      });
      
      console.log('ClipboardJS 初始化完成');
    } else {
      console.warn('ClipboardJS 未加载');
    }

    // ========== MathJax 初始化 ==========
    console.log('初始化 MathJax...');
    if (window.MathJax) {
      MathJax.typesetPromise([processedContent]).then(function() {
        console.log('MathJax 渲染完成');
      }).catch(function (err) {
        console.log('MathJax typeset failed: ' + err.message);
      });
    }
  }, 50);
}
window.__rcProcessPost = __rcProcessPost;
document.addEventListener('DOMContentLoaded', __rcProcessPost);
