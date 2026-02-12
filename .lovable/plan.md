

# 🎵 Clone do Spotify - Frontend

Clone visual do Spotify com tema escuro, usando suas interfaces TypeScript como camada de dados.

## Dados (Backend)
- Manter exatamente suas interfaces (`Music`, `Album`, `Artist`, `Playlist`) e classes (`Song`, `Playlists`)
- Adicionar mais dados mock (mais artistas, músicas e álbuns) para popular a interface
- Criar um contexto React (`PlayerContext`) para gerenciar o estado global do player (música atual, play/pause, progresso)

## Design System
- Tema escuro inspirado no Spotify: fundo preto/cinza escuro, texto branco, cor de destaque verde (#1DB954)
- Tipografia limpa e moderna
- Cards arredondados com hover effects

## Layout Principal
- **Sidebar** à esquerda com navegação (Home, Buscar, Biblioteca, Playlists)
- **Área principal** no centro com conteúdo da página
- **Player fixo** na parte inferior da tela (sempre visível)

## Páginas

### 🏠 Home
- Seções horizontais com cards: "Tocadas Recentemente", "Feitas para Você", "Artistas Populares"
- Cards clicáveis que levam a álbuns, playlists ou artistas

### 🎤 Página do Artista
- Banner com nome do artista
- Lista de músicas populares do artista
- Seção de álbuns do artista

### 💿 Página do Álbum
- Capa, nome e artista do álbum
- Lista de faixas com duração
- Botão de play para tocar o álbum

### 📋 Página de Playlist
- Nome da playlist e lista de músicas
- Funcionalidade de adicionar/remover músicas (usando seus métodos `addMusic`/`removeMusic`)

### 🔍 Biblioteca
- Lista de playlists criadas pelo usuário
- Botão para criar nova playlist

## Player (Barra Inferior)
- Informações da música atual (nome, artista)
- Controles: anterior, play/pause, próxima
- Barra de progresso simulada com timer (avança automaticamente ao dar play)
- Controle de volume (visual)
- Simulação de reprodução: ao clicar play, o timer avança e a barra de progresso se move

