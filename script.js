// Script para o site do ilustrador

document.addEventListener('DOMContentLoaded', function() {
    // Animação suave de rolagem para links de navegação
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Ajuste para o cabeçalho fixo
                behavior: 'smooth'
            });
        });
    });

    // Animação de entrada para elementos do portfólio
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para animar elementos quando estiverem visíveis
    function animateOnScroll() {
        galleryItems.forEach((item, index) => {
            // Adicionar índice como variável CSS para atraso na animação
            item.style.setProperty('--i', index);
            
            if (isElementInViewport(item)) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animação (agora usando CSS animations)
    galleryItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    // Executar animação no carregamento e no scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Filtro de portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Obter categoria do filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar itens da galeria
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Ajustar layout da galeria após filtro
            setTimeout(() => {
                const gallery = document.querySelector('.gallery');
                gallery.style.height = 'auto';
            }, 500);
        });
    });
    
    // Validação do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores dos campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validação simples
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de email válido.');
                return;
            }
            
            // Simulação de envio (aqui você adicionaria o código para enviar o formulário)
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // Efeito de header com scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.backgroundColor = 'var(--primary-color)';
        }
    });
    
    // Funcionalidade do Modal para exibir imagens
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    
    // Função para abrir o modal
    function openModal(imgSrc, title, description) {
        modalImage.src = imgSrc;
        modalImage.alt = description;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Desabilitar o scroll da página quando o modal estiver aberto
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o modal
    function closeModalFunc() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Habilitar o scroll da página novamente
        document.body.style.overflow = 'auto';
    }
    
    // Adicionar evento de clique para cada item da galeria
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.overlay h3').textContent;
            const description = img.alt;
            
            openModal(img.src, title, description);
        });
    });
    
    // Fechar o modal ao clicar no botão de fechar
    closeModal.addEventListener('click', closeModalFunc);
    
    // Fechar o modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Fechar o modal ao pressionar a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });

    // ===== FUNCIONALIDADE DO BOTÃO FLUTUANTE E FORMULÁRIO DE ORÇAMENTO =====
    
    // Elementos do modal de orçamento
    const budgetFloatingBtn = document.getElementById('budgetFloatingBtn');
    const budgetModal = document.getElementById('budgetModal');
    const budgetClose = document.querySelector('.budget-close');
    const budgetForm = document.getElementById('budgetForm');
    const btnCancel = document.querySelector('.btn-cancel');
    const fileInput = document.getElementById('references');
    const fileList = document.getElementById('fileList');
    const whatsappInput = document.getElementById('clientWhatsapp');
    
    let selectedFiles = [];
    
    // Abrir modal de orçamento
    function openBudgetModal() {
        budgetModal.style.display = 'flex';
        setTimeout(() => {
            budgetModal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    // Fechar modal de orçamento
    function closeBudgetModal() {
        budgetModal.classList.remove('show');
        setTimeout(() => {
            budgetModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Máscara para WhatsApp
    function formatWhatsApp(value) {
        // Remove tudo que não é dígito
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara (11) 99999-9999
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
            value = value.replace(/(\d{2})/, '($1');
        }
        
        return value;
    }
    
    // Aplicar máscara no campo WhatsApp
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            e.target.value = formatWhatsApp(e.target.value);
        });
    }
    
    // Função para formatar tamanho do arquivo
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Função para adicionar arquivo à lista
    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
            <span class="remove-file" data-filename="${file.name}">&times;</span>
        `;
        
        fileList.appendChild(fileItem);
        
        // Adicionar evento para remover arquivo
        const removeBtn = fileItem.querySelector('.remove-file');
        removeBtn.addEventListener('click', function() {
            const filename = this.getAttribute('data-filename');
            selectedFiles = selectedFiles.filter(f => f.name !== filename);
            fileItem.remove();
        });
    }
    
    // Função para validar arquivo
    function validateFile(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        
        if (!allowedTypes.includes(file.type)) {
            alert('Formato de arquivo não suportado. Use JPG, PNG ou GIF.');
            return false;
        }
        
        if (file.size > maxSize) {
            alert('Arquivo muito grande. Tamanho máximo: 5MB.');
            return false;
        }
        
        return true;
    }
    
    // Manipular seleção de arquivos
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                if (validateFile(file)) {
                    // Verificar se o arquivo já foi adicionado
                    const alreadyExists = selectedFiles.some(f => f.name === file.name);
                    if (!alreadyExists) {
                        selectedFiles.push(file);
                        addFileToList(file);
                    }
                }
            });
            
            // Limpar o input para permitir selecionar o mesmo arquivo novamente
            e.target.value = '';
        });
    }
    
    // Drag and drop para área de upload
    const fileUploadArea = document.querySelector('.file-upload-area');
    if (fileUploadArea) {
        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--accent-color)';
            this.style.backgroundColor = 'rgba(46, 45, 63, 0.7)';
        });
        
        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(161, 151, 195, 0.4)';
            this.style.backgroundColor = 'rgba(46, 45, 63, 0.3)';
        });
        
        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(161, 151, 195, 0.4)';
            this.style.backgroundColor = 'rgba(46, 45, 63, 0.3)';
            
            const files = Array.from(e.dataTransfer.files);
            files.forEach(file => {
                if (validateFile(file)) {
                    const alreadyExists = selectedFiles.some(f => f.name === file.name);
                    if (!alreadyExists) {
                        selectedFiles.push(file);
                        addFileToList(file);
                    }
                }
            });
        });
    }
    
    // Função para validar formulário
    function validateBudgetForm() {
        const requiredFields = [
            { id: 'clientName', name: 'Nome Completo' },
            { id: 'clientWhatsapp', name: 'WhatsApp' },
            { id: 'artType', name: 'Tipo de Arte' },
            { id: 'artStyle', name: 'Estilo' },
            { id: 'background', name: 'Fundo' }
        ];
        
        for (let field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                alert(`Por favor, preencha o campo: ${field.name}`);
                element.focus();
                return false;
            }
        }
        
        // Validar formato do WhatsApp
        const whatsappValue = document.getElementById('clientWhatsapp').value;
        const whatsappRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!whatsappRegex.test(whatsappValue)) {
            alert('Por favor, insira um número de WhatsApp válido.');
            document.getElementById('clientWhatsapp').focus();
            return false;
        }
        
        return true;
    }
    
    // Função para enviar formulário
    function submitBudgetForm(formData) {
        // Aqui você pode implementar o envio real do formulário
        // Por exemplo, enviar para um servidor ou integrar com WhatsApp
        
        // Simular envio
        alert('Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        budgetForm.reset();
        selectedFiles = [];
        fileList.innerHTML = '';
        
        // Fechar modal
        closeBudgetModal();
    }
    
    // Event listeners
    if (budgetFloatingBtn) {
        budgetFloatingBtn.addEventListener('click', openBudgetModal);
    }
    
    if (budgetClose) {
        budgetClose.addEventListener('click', closeBudgetModal);
    }
    
    if (btnCancel) {
        btnCancel.addEventListener('click', closeBudgetModal);
    }
    
    // Fechar modal ao clicar fora
    if (budgetModal) {
        budgetModal.addEventListener('click', function(e) {
            if (e.target === budgetModal) {
                closeBudgetModal();
            }
        });
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && budgetModal && budgetModal.classList.contains('show')) {
            closeBudgetModal();
        }
    });
    
    // Enviar formulário
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateBudgetForm()) {
                const formData = new FormData(this);
                
                // Adicionar arquivos selecionados
                selectedFiles.forEach((file, index) => {
                    formData.append(`reference_${index}`, file);
                });
                
                submitBudgetForm(formData);
            }
        });
    }
});