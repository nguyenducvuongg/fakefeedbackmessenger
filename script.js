
let messages = [];
let avatars = {
    contact: null,
    sender1: null,
    sender2: null
};

// Initialize with sample messages
function initSampleMessages() {
    messages = [
        {
            type: 'text',
            content: 'Tại web swap bị public rồi',
            sender: 'me',
            time: '11:05',
            avatar: null
        },
        {
            type: 'text',
            content: 'Lẹ lẹ',
            sender: 'other1',
            time: '11:05',
            avatar: null
        },
        {
            type: 'image',
            content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkjDrG5oIOG6o25oPC90ZXh0Pgo8L3N2Zz4K',
            sender: 'other1',
            time: '11:05',
            avatar: null
        },
        {
            type: 'text',
            content: 'Ok rồi đấy',
            sender: 'me',
            time: '11:06',
            avatar: null
        },
        {
            type: 'text',
            content: 'Okok',
            sender: 'other1',
            time: '11:06',
            avatar: null
        },
        {
            type: 'text',
            content: 'Sao em',
            sender: 'other1',
            time: '11:07',
            avatar: null
        },
        {
            type: 'text',
            content: 'Để t tắm 1,5-2u cho acc chính nha',
            sender: 'me',
            time: '11:08',
            avatar: null
        }
    ];
    renderMessages();
    updateMessageList();
}

// Event listeners
document.getElementById('statusTime').addEventListener('change', updateStatusTime);
document.getElementById('batteryLevel').addEventListener('change', updateBattery);
document.getElementById('contactName').addEventListener('input', updateContactName);
document.getElementById('contactAvatar').addEventListener('change', (e) => handleAvatarUpload(e, 'contact'));
document.getElementById('sender1Avatar').addEventListener('change', (e) => handleAvatarUpload(e, 'sender1'));
document.getElementById('sender2Avatar').addEventListener('change', (e) => handleAvatarUpload(e, 'sender2'));
document.getElementById('messageType').addEventListener('change', toggleMessageType);

function updateStatusTime() {
    const time = document.getElementById('statusTime').value;
    document.getElementById('timeDisplay').textContent = time;
}

function updateBattery() {
    const level = document.getElementById('batteryLevel').value;
    document.getElementById('batteryPercent').textContent = level;
    document.getElementById('batteryFill').style.width = level + '%';
}

function updateContactName() {
    const name = document.getElementById('contactName').value;
    document.getElementById('contactNameDisplay').textContent = name;
}

function handleAvatarUpload(event, type) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            avatars[type] = e.target.result;
            if (type === 'contact') {
                document.getElementById('contactAvatarImg').src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
}

function toggleMessageType() {
    const type = document.getElementById('messageType').value;
    const textGroup = document.getElementById('textGroup');
    const imageGroup = document.getElementById('imageGroup');

    if (type === 'text') {
        textGroup.style.display = 'block';
        imageGroup.style.display = 'none';
    } else {
        textGroup.style.display = 'none';
        imageGroup.style.display = 'block';
    }
}

function addMessage() {
    const type = document.getElementById('messageType').value;
    const sender = document.getElementById('messageSender').value;
    const time = document.getElementById('messageTime').value;

    let content = '';

    if (type === 'text') {
        content = document.getElementById('messageText').value.trim();
        if (!content) {
            alert('Vui lòng nhập nội dung tin nhắn');
            return;
        }
    } else {
        const imageFile = document.getElementById('messageImage').files[0];
        if (!imageFile) {
            alert('Vui lòng chọn hình ảnh');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const message = {
                type: 'image',
                content: e.target.result,
                sender: sender,
                time: time,
                avatar: getAvatarForSender(sender)
            };
            messages.push(message);
            renderMessages();
            updateMessageList();
        };
        reader.readAsDataURL(imageFile);
        return;
    }

    const message = {
        type: type,
        content: content,
        sender: sender,
        time: time,
        avatar: getAvatarForSender(sender)
    };

    messages.push(message);
    renderMessages();
    updateMessageList();

    // Clear inputs
    document.getElementById('messageText').value = '';
    document.getElementById('messageImage').value = '';
}

function getAvatarForSender(sender) {
    if (sender === 'other1') return avatars.sender1;
    if (sender === 'other2') return avatars.sender2;
    return null;
}

function renderMessages() {
    const container = document.getElementById('chatContainer');
    container.innerHTML = '';

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender === 'me' ? 'sent' : 'received'}`;

        let avatarImg = '';
        if (message.sender !== 'me' && message.avatar) {
            avatarImg = `<img src="${message.avatar}" alt="Avatar" class="message-avatar">`;
        } else if (message.sender !== 'me') {
            avatarImg = `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiM0RkMzRjciLz4KPHN2ZyB4PSI3IiB5PSI3IiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K" alt="Avatar" class="message-avatar">`;
        }

        let contentHtml = '';
        if (message.type === 'text') {
            contentHtml = `<div class="message-bubble">${message.content}</div>`;
        } else {
            contentHtml = `<img src="${message.content}" alt="Shared image" class="message-image">`;
        }

        messageDiv.innerHTML = `
                    ${avatarImg}
                    <div class="message-content">
                        ${contentHtml}
                        <div class="message-time">${message.time}</div>
                    </div>
                `;

        container.appendChild(messageDiv);
    });

    container.scrollTop = container.scrollHeight;
}

function updateMessageList() {
    const list = document.getElementById('messageList');
    if (messages.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #888; font-size: 12px;">Chưa có tin nhắn nào</div>';
        return;
    }

    list.innerHTML = '';
    messages.forEach((message, index) => {
        const item = document.createElement('div');
        item.className = 'message-item';

        const preview = message.type === 'text' ? message.content : '[Hình ảnh]';
        const senderName = message.sender === 'me' ? 'Tôi' :
            message.sender === 'other1' ? document.getElementById('sender1Name').value :
                document.getElementById('sender2Name').value;

        item.innerHTML = `
                    <div class="message-preview">${senderName}: ${preview}</div>
                    <button class="delete-btn" onclick="deleteMessage(${index})">Xóa</button>
                `;

        list.appendChild(item);
    });
}

function deleteMessage(index) {
    messages.splice(index, 1);
    renderMessages();
    updateMessageList();
}

function clearMessages() {
    if (confirm('Bạn có chắc muốn xóa tất cả tin nhắn?')) {
        messages = [];
        renderMessages();
        updateMessageList();
    }
}

async function exportImage() {
    try {
        const phoneContainer = document.getElementById('phoneContainer');

        // Hide any UI elements that shouldn't be in the export
        const controlsPanel = document.querySelector('.controls');
        const exportBtn = document.querySelector('.export-btn');

        controlsPanel.style.display = 'none';
        exportBtn.style.display = 'none';

        const canvas = await html2canvas(phoneContainer, {
            backgroundColor: '#000000',
            scale: 2,
            width: 360,
            height: 640,
            useCORS: true,
            allowTaint: true
        });

        // Restore UI elements
        controlsPanel.style.display = 'block';
        exportBtn.style.display = 'block';

        // Download the image
        const link = document.createElement('a');
        link.download = 'messenger-chat.png';
        link.href = canvas.toDataURL();
        link.click();

    } catch (error) {
        console.error('Error exporting image:', error);
        alert('Có lỗi xảy ra khi xuất ảnh. Vui lòng thử lại.');
    }
}

// Initialize the app
initSampleMessages();
updateStatusTime();
updateBattery();