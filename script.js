document.addEventListener("DOMContentLoaded", function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";
  
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");
    const todoPriority = document.getElementById("todo-priority");
    const todoList = document.getElementById("todo-list");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    // 通知が利用可能なら、ページ読み込み時にユーザーへ許可を求める
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
      });
    }
  
    // タスクの保存
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // タスクの期日に合わせて通知をスケジュールする
    function scheduleNotification(task) {
      if (!('Notification' in window) || Notification.permission !== 'granted' || !task.dueDate) {
        return;
      }
      // 入力された日付（YYYY-MM-DD）を Date オブジェクトに変換（ローカルの深夜となる）
      const dueTime = new Date(task.dueDate).getTime();
      const now = Date.now();
      const delay = dueTime - now;
      // 期日が未来の場合のみ通知をスケジュール
      if (delay > 0) {
        setTimeout(() => {
          new Notification('タスクリマインダー', {
            body: `タスク「${task.text}」の期限です。`
          });
        }, delay);
      }
    }
  
    // タスクのレンダリング
    function renderTasks() {
      todoList.innerHTML = "";
      tasks.forEach(task => {
        if (currentFilter === "active" && task.completed) return;
        if (currentFilter === "completed" && !task.completed) return;
        
        const li = document.createElement("li");
        li.className = "todo-item";
        li.setAttribute("data-id", task.id);
        
        // チェックボックス
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", toggleTask);
        li.appendChild(checkbox);
  
        // タスクのテキスト
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = task.text;
        if(task.completed) {
          span.classList.add("completed");
        }
        li.appendChild(span);
  
        // 期日の表示（設定されていれば）
        if(task.dueDate) {
          const dateSpan = document.createElement("span");
          dateSpan.className = "todo-date";
          dateSpan.textContent = task.dueDate;
          li.appendChild(dateSpan);
        }
        
        // 優先度の表示
        const prioritySpan = document.createElement("span");
        prioritySpan.className = "todo-priority";
        prioritySpan.textContent = task.priority;
        li.appendChild(prioritySpan);
  
        // 編集ボタン
        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "編集";
        editButton.addEventListener("click", editTask);
        li.appendChild(editButton);
  
        // 削除ボタン
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", deleteTask);
        li.appendChild(deleteButton);
  
        todoList.appendChild(li);
      });
    }
  
    // タスクの追加
    function addTask(e) {
      e.preventDefault();
      const text = todoInput.value.trim();
      const dueDate = todoDate.value;
      const priority = todoPriority.value;
      if (text === "") return;
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        dueDate,
        priority
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      // 期日が設定されている場合は通知をスケジュール
      scheduleNotification(newTask);
      todoForm.reset();
    }
  
    // タスクの完了状態の切替
    function toggleTask(e) {
      const li = e.target.parentElement;
      const id = parseInt(li.getAttribute("data-id"));
      tasks = tasks.map(task => {
        if (task.id === id) {
          task.completed = e.target.checked;
        }
        return task;
      });
      saveTasks();
      renderTasks();
    }
  
    // タスクの削除
    function deleteTask(e) {
      const li = e.target.parentElement;
      const id = parseInt(li.getAttribute("data-id"));
      tasks = tasks.filter(task => task.id !== id);
      saveTasks();
      renderTasks();
    }
  
    // タスクの編集（テキストのみ）
    function editTask(e) {
      const li = e.target.parentElement;
      const id = parseInt(li.getAttribute("data-id"));
      const task = tasks.find(task => task.id === id);
      const newText = prompt("タスクを編集してください", task.text);
      if(newText !== null) {
        task.text = newText.trim() || task.text;
        saveTasks();
        renderTasks();
      }
    }
  
    // フィルター切替
    function setFilter(e) {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.getAttribute("data-filter");
      renderTasks();
    }
  
    filterButtons.forEach(btn => {
      btn.addEventListener("click", setFilter);
    });
  
    todoForm.addEventListener("submit", addTask);
  
    // 初回レンダリング
    renderTasks();
  });
  