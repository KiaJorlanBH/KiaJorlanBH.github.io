// Mapeamento dos campos do formulário para a preview
const fieldMappings = {
  // Dados básicos
  'propostaNumero': 'pv-propostaNumero',
  'dataEmissao': 'pv-dataEmissao',
  'validade': 'pv-validade',
  'aprovadoPor': 'pv-aprovadoPor',
  
  // Dados do cliente
  'cliente': 'pv-cliente',
  'cnpjCliente': 'pv-cnpjCliente',
  'ie': 'pv-ie',
  'endereco': 'pv-endereco',
  'bairro': 'pv-bairro',
  'cidade': 'pv-cidade',
  'email': 'pv-email',
  'dataNascimento': 'pv-dataNascimento',
  'telefoneRes': 'pv-telefoneRes',
  'telefoneCom': 'pv-telefoneCom',
  'celular': 'pv-celular',
  'vendedor': 'pv-vendedor',
  
  // Dados do veículo
  'veiculo': 'pv-veiculo',
  'anoModelo': 'pv-anoModelo',
  'motor': 'pv-motor',
  'combustivel': 'pv-combustivel',
  'linha': 'pv-linha',
  'cor': 'pv-cor',
  'corInterna': 'pv-corInterna',
  'chassi': 'pv-chassi',
  'renavam': 'pv-renavam',
  'numeroMotor': 'pv-numeroMotor',
  'placa': 'pv-placa',
  'km': 'pv-km',
  'patio': 'pv-patio',
  'pedidoFabrica': 'pv-pedidoFabrica',
  'previsaoPedido': 'pv-previsaoPedido',
  'nfFabrica': 'pv-nfFabrica',
  'pedidoComercial': 'pv-pedidoComercial',
  'ncm': 'pv-ncm',
  'codFiname': 'pv-codFiname',
  
  // Valores
  'valorTabela': 'pv-valorTabela',
  'descontoBasico': 'pv-descontoBasico',
  'icmsSubst': 'pv-icmsSubst',
  'descontoIcms': 'pv-descontoIcms',
  'ipi': 'pv-ipi',
  'fcpSt': 'pv-fcpSt',
  'descontoIncond': 'pv-descontoIncond',
  'valorNegociado': 'pv-valorNegociado',
  'valorNotaFiscal': 'pv-valorNotaFiscal',
  
  // Forma de pagamento
  'entrada': 'pv-entrada',
  'seminovos': 'pv-seminovos',
  'financiamento': 'pv-financiamento',
  'financiadora': 'pv-financiadora',
  'planoMeses': 'pv-planoMeses',
  'indice': 'pv-indice',
  'parcela': 'pv-parcela',
  
  // Observações
  'observacaoProposta': 'pv-observacaoProposta'
};

// Função para formatar moeda
function formatCurrency(value) {
  if (!value || isNaN(value)) return '0,00';
  return parseFloat(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Função para formatar data
function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR');
}

// Função para atualizar preview
function updatePreview(inputId, value) {
  const previewId = fieldMappings[inputId];
  if (!previewId) return;
  
  const previewElement = document.getElementById(previewId);
  if (!previewElement) return;
  
  // Tratamento especial para diferentes tipos de campos
  if (inputId.includes('data') || inputId === 'dataNascimento' || inputId === 'previsaoPedido' || inputId === 'nfEmissao') {
    previewElement.textContent = formatDate(value);
  } else if (inputId.includes('valor') || inputId.includes('desconto') || inputId.includes('entrada') || 
             inputId.includes('seminovos') || inputId.includes('financiamento') || inputId.includes('parcela') ||
             inputId.includes('icms') || inputId.includes('ipi') || inputId.includes('fcp')) {
    previewElement.textContent = formatCurrency(value);
  } else if (inputId === 'observacaoProposta') {
    previewElement.textContent = value || '—';
  } else {
    previewElement.textContent = value || '—';
  }
  
  // Atualizar também as assinaturas
  if (inputId === 'vendedor') {
    const vendedorAssinatura = document.getElementById('pv-vendedorAssinatura');
    if (vendedorAssinatura) {
      vendedorAssinatura.textContent = value || '—';
    }
  }
  
  if (inputId === 'cliente') {
    const clienteAssinatura = document.getElementById('pv-clienteAssinatura');
    if (clienteAssinatura) {
      clienteAssinatura.textContent = value || '—';
    }
  }
}

// Função para tratar checkboxes
function updateCheckboxPreview(inputId, checked) {
  const previewId = 'pv-' + inputId;
  const previewElement = document.getElementById(previewId);
  if (previewElement) {
    if (checked) {
      previewElement.classList.remove('hidden');
    } else {
      previewElement.classList.add('hidden');
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Definir data atual por padrão
  const today = new Date().toISOString().split('T')[0];
  const dataEmissaoInput = document.getElementById('dataEmissao');
  if (dataEmissaoInput) {
    dataEmissaoInput.value = today;
    updatePreview('dataEmissao', today);
  }
  
  // Adicionar listeners para todos os campos
  Object.keys(fieldMappings).forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', function() {
        updatePreview(inputId, this.value);
      });
    }
  });
  
  // Listeners para checkboxes
  const checkboxes = ['politicamenteExposto', 'servidorPublico'];
  checkboxes.forEach(checkboxId => {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        updateCheckboxPreview(checkboxId, this.checked);
      });
    }
  });
  
  // Botão reset
  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja limpar todos os campos?')) {
        // Limpar todos os inputs
        const inputs = document.querySelectorAll('#form input, #form textarea, #form select');
        inputs.forEach(input => {
          if (input.type === 'checkbox') {
            input.checked = false;
          } else {
            input.value = '';
          }
        });
        
        // Limpar preview
        Object.values(fieldMappings).forEach(previewId => {
          const element = document.getElementById(previewId);
          if (element) {
            element.textContent = '—';
          }
        });
        
        // Esconder checkboxes na preview
        document.getElementById('pv-politicamenteExposto')?.classList.add('hidden');
        document.getElementById('pv-servidorPublico')?.classList.add('hidden');
        
        // Restaurar data atual
        const dataEmissaoInput = document.getElementById('dataEmissao');
        if (dataEmissaoInput) {
          dataEmissaoInput.value = today;
          updatePreview('dataEmissao', today);
        }
      }
    });
  }
  
  // Máscara para CNPJ/CPF
  const cnpjInput = document.getElementById('cnpjCliente');
  if (cnpjInput) {
    cnpjInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        // CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        // CNPJ
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      }
      
      this.value = value;
      updatePreview('cnpjCliente', value);
    });
  }
  
  // Máscara para telefones
  const telefoneInputs = ['telefoneRes', 'telefoneCom', 'celular'];
  telefoneInputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (inputId === 'celular') {
          // Celular: (XX) XXXXX-XXXX
          value = value.replace(/(\d{2})(\d)/, '($1) $2');
          value = value.replace(/(\d{5})(\d)/, '$1-$2');
        } else {
          // Fixo: (XX) XXXX-XXXX
          value = value.replace(/(\d{2})(\d)/, '($1) $2');
          value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        
        this.value = value;
        updatePreview(inputId, value);
      });
    }
  });
  
  // Máscara para placa
  const placaInput = document.getElementById('placa');
  if (placaInput) {
    placaInput.addEventListener('input', function() {
      let value = this.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      
      if (value.length > 3) {
        value = value.substring(0, 3) + '-' + value.substring(3, 7);
      }
      
      this.value = value;
      updatePreview('placa', value);
    });
  }
});

// Função para calcular valor negociado automaticamente
function calcularValorNegociado() {
  const valorTabela = parseFloat(document.getElementById('valorTabela')?.value) || 0;
  const descontoBasico = parseFloat(document.getElementById('descontoBasico')?.value) || 0;
  const icmsSubst = parseFloat(document.getElementById('icmsSubst')?.value) || 0;
  const descontoIcms = parseFloat(document.getElementById('descontoIcms')?.value) || 0;
  const ipi = parseFloat(document.getElementById('ipi')?.value) || 0;
  const fcpSt = parseFloat(document.getElementById('fcpSt')?.value) || 0;
  const descontoIncond = parseFloat(document.getElementById('descontoIncond')?.value) || 0;
  
  const valorNegociado = valorTabela - descontoBasico + icmsSubst - descontoIcms + ipi + fcpSt - descontoIncond;
  
  const valorNegociadoInput = document.getElementById('valorNegociado');
  if (valorNegociadoInput) {
    valorNegociadoInput.value = valorNegociado.toFixed(2);
    updatePreview('valorNegociado', valorNegociado.toFixed(2));
  }
}

// Adicionar listeners para cálculo automático
document.addEventListener('DOMContentLoaded', function() {
  const camposCalculo = ['valorTabela', 'descontoBasico', 'icmsSubst', 'descontoIcms', 'ipi', 'fcpSt', 'descontoIncond'];
  
  camposCalculo.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', calcularValorNegociado);
    }
  });
});